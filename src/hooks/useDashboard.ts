import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  getDashboardData,
  getAvailableDashboardPeriods,
  subscribeToDashboard,
  type DashboardData,
  type DashboardPeriod,
} from "@/services/dashboard.service";

/* ============================================================================
   TYPES
============================================================================ */

interface UseDashboardReturn {
  data: DashboardData | null;

  loading: boolean;
  error: string | null;

  selectedPeriod: DashboardPeriod;
  effectivePeriod: DashboardPeriod;

  periodOptions: DashboardData["availablePeriods"];

  stats: DashboardData["stats"] | null;
  analytics: DashboardData["analytics"] | null;
  topProducts: DashboardData["topProducts"];
  activities: DashboardData["activities"];

  refresh: () => Promise<void>;

  setSelectedPeriod: (
    period: DashboardPeriod
  ) => void;
}

/* ============================================================================
   HOOK
============================================================================ */

export const useDashboard =
  (): UseDashboardReturn => {
    const [data, setData] =
      useState<DashboardData | null>(null);

    const [loading, setLoading] =
      useState<boolean>(true);

    const [error, setError] =
      useState<string | null>(null);

    const [selectedPeriod, setSelectedPeriod] =
      useState<DashboardPeriod>("30d");

    const mountedRef = useRef(true);

    const refreshTimerRef =
      useRef<ReturnType<typeof setTimeout> | null>(
        null
      );

    /* ------------------------------------------------------------------------
       Chargement
    ------------------------------------------------------------------------ */

    const refresh = useCallback(async (): Promise<void> => {
      try {
        setError(null);

        const nextData =
          await getDashboardData(selectedPeriod);

        if (!mountedRef.current) {
          return;
        }

        setData(nextData);
      } catch (error: unknown) {
        console.error(
          "Erreur chargement dashboard :",
          error
        );

        if (!mountedRef.current) {
          return;
        }

        setError(
          error instanceof Error
            ? error.message
            : "Impossible de charger le dashboard."
        );
      } finally {
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    }, [selectedPeriod]);

    /* ------------------------------------------------------------------------
       Initialisation + changement de période
    ------------------------------------------------------------------------ */

    useEffect(() => {
      mountedRef.current = true;

      setLoading(true);

      void refresh();

      return () => {
        mountedRef.current = false;
      };
    }, [refresh]);

    /* ------------------------------------------------------------------------
       Realtime
    ------------------------------------------------------------------------ */

    useEffect(() => {
      const scheduleRefresh = (): void => {
        if (refreshTimerRef.current) {
          clearTimeout(refreshTimerRef.current);
        }

        /*
         * Petit regroupement des événements Realtime.
         * Exemple :
         * orders INSERT
         * + order_items INSERT
         *
         * => un seul refresh au lieu de deux.
         */
        refreshTimerRef.current = setTimeout(() => {
          if (mountedRef.current) {
            void refresh();
          }
        }, 200);
      };

      const unsubscribe =
        subscribeToDashboard(
          scheduleRefresh
        );

      return () => {
        unsubscribe();

        if (refreshTimerRef.current) {
          clearTimeout(
            refreshTimerRef.current
          );

          refreshTimerRef.current = null;
        }
      };
    }, [refresh]);

    /* ------------------------------------------------------------------------
       Périodes disponibles
    ------------------------------------------------------------------------ */

    const periodOptions =
      useMemo(() => {
        if (data?.availablePeriods?.length) {
          return data.availablePeriods;
        }

        return getAvailableDashboardPeriods(
          data?.storeCreatedAt ?? null
        );
      }, [
        data?.availablePeriods,
        data?.storeCreatedAt,
      ]);

    /* ------------------------------------------------------------------------
       Période réellement utilisée
    ------------------------------------------------------------------------ */

    const effectivePeriod =
      useMemo<DashboardPeriod>(() => {
        const selectedExists =
          periodOptions.some(
            (period) =>
              period.key === selectedPeriod
          );

        if (selectedExists) {
          return selectedPeriod;
        }

        /*
         * On privilégie la plus grande période
         * réellement disponible avec une durée connue.
         *
         * Exemple :
         * boutique âgée de 12 jours
         * => aujourd'hui
         * => 7 jours
         * => all
         *
         * 30 jours ne sera pas utilisé.
         */
        const latestTimedPeriod =
          [...periodOptions]
            .reverse()
            .find(
              (period) =>
                period.days !== null
            );

        return (
          latestTimedPeriod?.key ??
          "all"
        );
      }, [
        periodOptions,
        selectedPeriod,
      ]);

    /* ------------------------------------------------------------------------
       Sélection de période
    ------------------------------------------------------------------------ */

    const handleSetSelectedPeriod =
      useCallback(
        (period: DashboardPeriod): void => {
          setSelectedPeriod(period);
        },
        []
      );

    /* ------------------------------------------------------------------------
       Données exposées
    ------------------------------------------------------------------------ */

    return {
      data,

      loading,
      error,

      selectedPeriod,
      effectivePeriod,

      periodOptions,

      stats: data?.stats ?? null,
      analytics:
        data?.analytics ?? null,

      topProducts:
        data?.topProducts ?? [],

      activities:
        data?.activities ?? [],

      refresh,

      setSelectedPeriod:
        handleSetSelectedPeriod,
    };
  };

export default useDashboard;