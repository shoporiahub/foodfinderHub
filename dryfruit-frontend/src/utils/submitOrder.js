// src/utils/submitOrder.js
import { API_BASE_URL } from "../config";

export async function submitOrder(payload, setStatus, setIsSubmitting, resetFn) {
  setStatus({ type: "", message: "" });

  try {
    setIsSubmitting(true);

    const response = await fetch(`${API_BASE_URL}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    setStatus({ type: "success", message: data.message || "Order placed successfully!" });
    resetFn();
  } catch (err) {
    setStatus({ type: "error", message: err.message || "Failed to place order." });
  } finally {
    setIsSubmitting(false);
  }
}
