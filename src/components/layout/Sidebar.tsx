import {
  LayoutDashboard,
  PlusCircle,
  Store,
  Package,
  Wallet,
  Trophy,
  Settings,
  CircleHelp,
  Search,
  PanelLeftClose,
  PanelLeft,
  X,
} from "lucide-react";
import { useEffect } from "react";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobile?: boolean;
}

const Sidebar = ({
  collapsed,
  onToggle,
  mobile = false,
}: SidebarProps) => {
  /* =====================================================
     ESCAPE = CLOSE MOBILE SIDEBAR
  ===================================================== */

  useEffect(() => {
    if (!mobile) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onToggle();
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [mobile, onToggle]);

  /* =====================================================
     NAVIGATION DATA
  ===================================================== */

  const primaryItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      active: true,
    },
    {
      label: "Add a Product",
      icon: PlusCircle,
    },
    {
      label: "Marketplace",
      icon: Store,
    },
  ];

  const creatorItems = [
    {
      label: "My Products",
      icon: Package,
    },
    {
      label: "Finance",
      icon: Wallet,
    },
    {
      label: "Leaderboard",
      icon: Trophy,
    },
  ];

  const supportItems = [
    {
      label: "Settings",
      icon: Settings,
    },
    {
      label: "Help & FAQ",
      icon: CircleHelp,
    },
  ];

  /* =====================================================
     RENDER NAV ITEMS
  ===================================================== */

  const renderItems = (
    items: {
      label: string;
      icon: React.ElementType;
      active?: boolean;
    }[]
  ) => {
    return items.map((item) => {
      const Icon = item.icon;

      return (
        <button
          key={item.label}
          type="button"
          title={
            collapsed && !mobile
              ? item.label
              : undefined
          }
          className={`
            group
            flex!
            w-full!
            cursor-pointer!
            items-center!
            rounded-lg!
            text-left!
            text-[13px]!
            font-semibold!
            transition-all!
            duration-150!
            ease-out!

            ${
              collapsed && !mobile
                ? "h-10! justify-center! px-2!"
                : "h-10! gap-3! px-3!"
            }

            ${
              item.active
                ? "bg-blue-100! text-gray-900!"
                : "text-gray-600! hover:bg-gray-100! hover:text-gray-900!"
            }

            hover:translate-x-0.5!
            active:scale-[0.98]!
          `}
        >
          <Icon
            size={17}
            strokeWidth={1.9}
            className={`
              shrink-0!
              transition-all!
              duration-150!
              ease-out!

              ${
                item.active
                  ? "text-gray-900!"
                  : "text-gray-500! group-hover:text-gray-900!"
              }

              group-hover:scale-105!
            `}
          />

          {(!collapsed || mobile) && (
            <span className="min-w-0! truncate! text-[13px]! font-semibold!">
              {item.label}
            </span>
          )}
        </button>
      );
    });
  };

  /* =====================================================
     SIDEBAR
  ===================================================== */

  if (mobile) {
    return (
      <>
        {/* =================================================
            MOBILE BACKDROP
        ================================================= */}

        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onToggle}
          className="
            fixed!
            inset-0!
            z-40!
            cursor-default!
            bg-black/30!
            backdrop-blur-[2px]!
            transition-opacity!
            duration-300!
          "
        />

        {/* =================================================
            MOBILE SIDEBAR
        ================================================= */}

        <aside
          onClick={(event) => {
            event.stopPropagation();
          }}
          className="
            fixed!
            inset-y-0!
            left-0!
            z-50!
            flex!
            h-screen!
            w-[260px]!
            max-w-[86vw]!
            flex-col!
            overflow-hidden!
            bg-white!
            text-gray-600!
            shadow-[8px_0_30px_rgba(0,0,0,0.12)]!
          "
        >
          {/* =============================================
              HEADER
          ============================================== */}

          <div
            className="
              flex!
              h-[64px]!
              shrink-0!
              items-center!
              justify-between!
              border-b!
              border-gray-100!
              px-4!
            "
          >
            {/* Logo */}

            <div className="flex! items-center! gap-2.5!">
              <img
                src="/favicon.png"
                alt="Orion"
                className="
                  h-7!
                  w-7!
                  shrink-0!
                  object-contain!
                "
              />

              <span
                className="
                  font-heading!
                  text-[15px]!
                  font-semibold!
                  tracking-tight!
                  text-gray-900!
                "
              >
                Orion
              </span>
            </div>

            {/* Close */}

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onToggle();
              }}
              aria-label="Close sidebar"
              className="
                group
                relative!
                z-[60]!
                flex!
                h-8!
                w-8!
                cursor-pointer!
                items-center!
                justify-center!
                rounded-lg!
                text-gray-400!
                transition-all!
                duration-200!
                ease-out!
                hover:bg-gray-100!
                hover:text-gray-800!
                active:scale-90!
              "
            >
              <X
                size={17}
                strokeWidth={2}
                className="
                  pointer-events-none!
                  transition-transform!
                  duration-200!
                  ease-out!
                  group-hover:rotate-90!
                "
              />
            </button>
          </div>

          {/* =============================================
              SEARCH
          ============================================== */}

          <div className="shrink-0! px-4! py-3!">
            <div className="relative!">
              <Search
                size={15}
                strokeWidth={1.9}
                className="
                  absolute!
                  left-3!
                  top-1/2!
                  -translate-y-1/2!
                  text-gray-400!
                "
              />

              <input
                type="text"
                placeholder="Search here..."
                className="
                  h-9!
                  w-full!
                  rounded-full!
                  border!
                  border-gray-200!
                  bg-white!
                  pl-9!
                  pr-3!
                  text-xs!
                  font-semibold!
                  text-gray-800!
                  outline-none!
                  placeholder:font-medium!
                  placeholder:text-gray-400!
                  transition-all!
                  duration-150!
                  focus:border-gray-300!
                  focus:ring-2!
                  focus:ring-gray-900/5!
                "
              />
            </div>
          </div>

          {/* =============================================
              NAVIGATION
          ============================================== */}

          <div
            className="
              mt-5!
              min-h-0!
              flex-1!
              overflow-y-auto!
              overflow-x-hidden!
              overscroll-contain!
              px-3!
              pb-5!
            "
          >
            {/* PRIMARY */}

            <nav>
              <div className="mb-2! flex! items-center! justify-between! px-2!">
                <span
                  className="
                    text-[9px]!
                    font-semibold!
                    uppercase!
                    tracking-[0.08em]!
                    text-gray-500!
                  "
                >
                  Primary
                </span>

                <span className="text-[10px]! font-semibold! text-gray-400!">
                  ^
                </span>
              </div>

              <div className="space-y-0.5!">
                {renderItems(primaryItems)}
              </div>
            </nav>

            {/* CREATOR */}

            <nav className="mt-7!">
              <div className="mb-2! flex! items-center! justify-between! px-2!">
                <span
                  className="
                    text-[9px]!
                    font-semibold!
                    uppercase!
                    tracking-[0.08em]!
                    text-gray-500!
                  "
                >
                  Creator
                </span>

                <span className="text-[10px]! font-semibold! text-gray-400!">
                  ^
                </span>
              </div>

              <div className="space-y-0.5!">
                {renderItems(creatorItems)}
              </div>
            </nav>

            {/* PROFILE & SUPPORT */}

            <nav className="mt-7!">
              <div className="mb-2! flex! items-center! justify-between! px-2!">
                <span
                  className="
                    text-[9px]!
                    font-semibold!
                    uppercase!
                    tracking-[0.08em]!
                    text-gray-500!
                  "
                >
                  Profile & Support
                </span>

                <span className="text-[10px]! font-semibold! text-gray-400!">
                  ^
                </span>
              </div>

              <div className="space-y-0.5!">
                {renderItems(supportItems)}
              </div>
            </nav>
          </div>
        </aside>
      </>
    );
  }

  /* =====================================================
     DESKTOP SIDEBAR
     TON DESIGN EST CONSERVÉ
  ===================================================== */

  return (
    <aside
      className={`
        sticky!
        top-0!
        z-40!
        flex!
        h-screen!
        shrink-0!
        flex-col!
        overflow-hidden!
        text-gray-600!
        transition-[width]!
        duration-200!
        ease-out!

        ${
          collapsed
            ? "w-[68px]!"
            : "w-[260px]!"
        }
      `}
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <div
        className={`
          flex!
          h-[64px]!
          shrink-0!
          items-center!
          px-4!

          ${
            collapsed
              ? "justify-center!"
              : "justify-between!"
          }
        `}
      >
        {/* Logo */}

        <div
          className={`
            flex!
            items-center!

            ${
              collapsed
                ? ""
                : "gap-2.5!"
            }
          `}
        >
          {!collapsed && (
            <>
              <img
                src="/favicon.png"
                alt="Orion"
                className="
                  h-7!
                  w-7!
                  shrink-0!
                  object-contain!
                "
              />

              <span
                className="
                  font-heading!
                  text-[15px]!
                  font-semibold!
                  tracking-tight!
                  text-gray-900!
                "
              >
                Orion
              </span>
            </>
          )}
        </div>

        {/* Toggle */}

        <button
          type="button"
          onClick={onToggle}
          aria-label={
            collapsed
              ? "Open sidebar"
              : "Collapse sidebar"
          }
          className="
            group
            cursor-pointer!
            rounded-lg!
            p-1.5!
            text-gray-400!
            transition-all!
            duration-200!
            hover:bg-gray-100!
            hover:text-gray-800!
            active:scale-90!
          "
        >
          {collapsed ? (
            <PanelLeft size={17} />
          ) : (
            <PanelLeftClose size={17} />
          )}
        </button>
      </div>

      {/* =================================================
          SEARCH
      ================================================= */}

      <div
        className={`
          shrink-0!
          py-3!

          ${
            collapsed
              ? "px-3!"
              : "px-4!"
          }
        `}
      >
        {collapsed ? (
          <button
            type="button"
            title="Search"
            className="
              flex!
              h-10!
              w-full!
              items-center!
              justify-center!
              rounded-lg!
              text-gray-500!
              transition-all!
              duration-150!
              hover:bg-gray-100!
              hover:text-gray-900!
              active:scale-95!
            "
          >
            <Search
              size={17}
              strokeWidth={1.9}
            />
          </button>
        ) : (
          <div className="relative!">
            <Search
              size={15}
              strokeWidth={1.9}
              className="
                absolute!
                left-3!
                top-1/2!
                -translate-y-1/2!
                text-gray-400!
              "
            />

            <input
              type="text"
              placeholder="Search here..."
              className="
                h-9!
                w-full!
                rounded-full!
                border!
                border-gray-200!
                bg-white!
                pl-9!
                pr-3!
                text-xs!
                font-semibold!
                text-gray-800!
                outline-none!
                placeholder:font-medium!
                placeholder:text-gray-400!
                transition-all!
                focus:border-gray-300!
                focus:ring-2!
                focus:ring-gray-900/5!
              "
            />
          </div>
        )}
      </div>

      {/* =================================================
          NAVIGATION
      ================================================= */}

      <div
        className="
          mt-5!
          min-h-0!
          flex-1!
          overflow-y-auto!
          overflow-x-hidden!
          px-3!
          pb-4!
        "
      >
        {/* PRIMARY */}

        <nav>
          {!collapsed && (
            <div className="mb-2! flex! items-center! justify-between! px-2!">
              <span
                className="
                  text-[9px]!
                  font-semibold!
                  uppercase!
                  tracking-[0.08em]!
                  text-gray-500!
                "
              >
                Primary
              </span>

              <span className="text-[10px]! font-semibold! text-gray-400!">
                ^
              </span>
            </div>
          )}

          <div className="space-y-0.5!">
            {renderItems(primaryItems)}
          </div>
        </nav>

        {/* CREATOR */}

        <nav className="mt-7!">
          {!collapsed && (
            <div className="mb-2! flex! items-center! justify-between! px-2!">
              <span
                className="
                  text-[9px]!
                  font-semibold!
                  uppercase!
                  tracking-[0.08em]!
                  text-gray-500!
                "
              >
                Creator
              </span>

              <span className="text-[10px]! font-semibold! text-gray-400!">
                ^
              </span>
            </div>
          )}

          <div className="space-y-0.5!">
            {renderItems(creatorItems)}
          </div>
        </nav>

        {/* PROFILE & SUPPORT */}

        <nav className="mt-7!">
          {!collapsed && (
            <div className="mb-2! flex! items-center! justify-between! px-2!">
              <span
                className="
                  text-[9px]!
                  font-semibold!
                  uppercase!
                  tracking-[0.08em]!
                  text-gray-500!
                "
              >
                Profile & Support
              </span>

              <span className="text-[10px]! font-semibold! text-gray-400!">
                ^
              </span>
            </div>
          )}

          <div className="space-y-0.5!">
            {renderItems(supportItems)}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;