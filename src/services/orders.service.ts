import { supabase } from "@/lib/supabase";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "refunded";

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  shipping_address: string;
  city: string;
  total_amount: number;
  currency: string;
  payment_method: string;
  payment_status: PaymentStatus | string;
  order_status: OrderStatus | string;
  notes: string | null;
  created_at: string;
}

export interface UpdateOrderStatusInput {
  orderId: string;
  status: OrderStatus;
}

export interface UpdatePaymentStatusInput {
  orderId: string;
  status: PaymentStatus;
}

/* -------------------------------------------------------------------------- */
/* Constantes                                                                 */
/* -------------------------------------------------------------------------- */

const ORDER_COLUMNS = `
  id,
  order_number,
  customer_name,
  customer_phone,
  shipping_address,
  city,
  total_amount,
  currency,
  payment_method,
  payment_status,
  order_status,
  notes,
  created_at
`;

/* -------------------------------------------------------------------------- */
/* Récupérer toutes les commandes                                             */
/* -------------------------------------------------------------------------- */

export async function getOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from("orders")
    .select(ORDER_COLUMNS)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erreur récupération commandes :", error);
    throw new Error(
      `Impossible de récupérer les commandes : ${error.message}`
    );
  }

  return (data ?? []) as Order[];
}

/* -------------------------------------------------------------------------- */
/* Récupérer une commande                                                     */
/* -------------------------------------------------------------------------- */

export async function getOrderById(
  orderId: string
): Promise<Order | null> {
  if (!orderId) {
    throw new Error("L'identifiant de la commande est requis.");
  }

  const { data, error } = await supabase
    .from("orders")
    .select(ORDER_COLUMNS)
    .eq("id", orderId)
    .maybeSingle();

  if (error) {
    console.error("Erreur récupération commande :", error);
    throw new Error(
      `Impossible de récupérer la commande : ${error.message}`
    );
  }

  return data as Order | null;
}

/* -------------------------------------------------------------------------- */
/* Modifier le statut de la commande                                          */
/* -------------------------------------------------------------------------- */

export async function updateOrderStatus({
  orderId,
  status,
}: UpdateOrderStatusInput): Promise<Order> {
  if (!orderId) {
    throw new Error("L'identifiant de la commande est requis.");
  }

  const { data, error } = await supabase
    .from("orders")
    .update({
      order_status: status,
    })
    .eq("id", orderId)
    .select(ORDER_COLUMNS)
    .single();

  if (error) {
    console.error("Erreur modification statut commande :", error);
    throw new Error(
      `Impossible de modifier le statut : ${error.message}`
    );
  }

  return data as Order;
}

/* -------------------------------------------------------------------------- */
/* Modifier le statut du paiement                                             */
/* -------------------------------------------------------------------------- */

export async function updatePaymentStatus({
  orderId,
  status,
}: UpdatePaymentStatusInput): Promise<Order> {
  if (!orderId) {
    throw new Error("L'identifiant de la commande est requis.");
  }

  const { data, error } = await supabase
    .from("orders")
    .update({
      payment_status: status,
    })
    .eq("id", orderId)
    .select(ORDER_COLUMNS)
    .single();

  if (error) {
    console.error("Erreur modification paiement :", error);
    throw new Error(
      `Impossible de modifier le paiement : ${error.message}`
    );
  }

  return data as Order;
}

/* -------------------------------------------------------------------------- */
/* Realtime : commandes                                                       */
/* -------------------------------------------------------------------------- */

export function subscribeToOrders(
  onInsert: (order: Order) => void,
  onUpdate?: (order: Order) => void,
  onDelete?: (order: Order) => void
) {
  const channel = supabase
    .channel("nexa-orders")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "orders",
      },
      (payload) => {
        onInsert(payload.new as Order);
      }
    )
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "orders",
      },
      (payload) => {
        onUpdate?.(payload.new as Order);
      }
    )
    .on(
      "postgres_changes",
      {
        event: "DELETE",
        schema: "public",
        table: "orders",
      },
      (payload) => {
        onDelete?.(payload.old as Order);
      }
    )
    .subscribe((status) => {
      console.log("Realtime orders :", status);
    });

  return () => {
    void supabase.removeChannel(channel);
  };
}