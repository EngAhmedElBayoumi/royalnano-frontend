/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetSalesInvoiceQuery } from "@/redux/services/dashboard/sales/salesInvoiceApi";
import { useRouter } from "next/navigation";
import {
  AwaitedReactNode,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";

export default function InvoicesTab({ customerId }: { customerId: number }) {
  const router = useRouter();
  const { data, isLoading, error } = useGetSalesInvoiceQuery({});
  if (isLoading) return <p>Loading invoices...</p>;
  if (error) return <p>Error fetching invoices.</p>;

  const invoices =
    data?.results.filter(
      (invoice: { customer: { id: number } }) =>
        invoice.customer.id === customerId
    ) || [];

  return (
    <div className="space-y-4">
      {invoices.length === 0 ? (
        <p>No invoices found for this customer.</p>
      ) : (
        invoices.map(
          (invoice: {
            id: Key | null | undefined;
            invoice_number:
              | string
              | number
              | bigint
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | Promise<AwaitedReactNode>
              | null
              | undefined;
            invoice_date:
              | string
              | number
              | bigint
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | Promise<AwaitedReactNode>
              | null
              | undefined;
            total_amount:
              | string
              | number
              | bigint
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | Promise<AwaitedReactNode>
              | null
              | undefined;
            status:
              | string
              | number
              | bigint
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | Promise<AwaitedReactNode>
              | null
              | undefined;
            description:
              | string
              | number
              | bigint
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | Promise<AwaitedReactNode>
              | null
              | undefined;
            items: any[];
            consumed_items: any[];
          }) => (
            <div
              key={invoice.id}
              className="border p-4 rounded shadow-md space-y-2 bg-white"
            >
              <p>
                <strong>Invoice #: </strong>
                {invoice.invoice_number}
              </p>
              <hr className="my-2" />
              <p>
                <strong>Date: </strong>
                {invoice.invoice_date}
              </p>
              <p>
                <strong>Total: </strong>
                {invoice.total_amount}
              </p>
              <p>
                <strong>Status: </strong>
                {invoice.status}
              </p>
              {invoice.description ? (
                <p>
                  <strong>Description: </strong>
                  {invoice.description}
                </p>
              ) : (
                <p>No description available</p>
              )}

              {/* Items */}
              <div className="mt-2">
                {invoice.items.length === 0 ? (
                  <p className="text-sm text-gray-500">No items</p>
                ) : (
                  <>
                    <strong>Items:</strong>

                    <ul className="list-disc pl-5 text-sm">
                      {invoice.items.map(
                        (item: {
                          id: Key | null | undefined;
                          item:
                            | string
                            | number
                            | bigint
                            | boolean
                            | ReactElement<
                                any,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | ReactPortal
                            | Promise<AwaitedReactNode>
                            | null
                            | undefined;
                          quantity:
                            | string
                            | number
                            | bigint
                            | boolean
                            | ReactElement<
                                any,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | ReactPortal
                            | Promise<AwaitedReactNode>
                            | null
                            | undefined;
                          unit_price:
                            | string
                            | number
                            | bigint
                            | boolean
                            | ReactElement<
                                any,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | ReactPortal
                            | Promise<AwaitedReactNode>
                            | null
                            | undefined;
                          total:
                            | string
                            | number
                            | bigint
                            | boolean
                            | ReactElement<
                                any,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | ReactPortal
                            | Promise<AwaitedReactNode>
                            | null
                            | undefined;
                          discount_percent:
                            | string
                            | number
                            | bigint
                            | boolean
                            | ReactElement<
                                any,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | ReactPortal
                            | Promise<AwaitedReactNode>
                            | null
                            | undefined;
                        }) => (
                          <li key={item.id}>
                            <span className="font-semibold">{item.item}</span> —{" "}
                            {item.quantity} × {item.unit_price} = {item.total}{" "}
                            (Disc: {item.discount_percent}%)
                          </li>
                        )
                      )}
                    </ul>
                  </>
                )}
              </div>

              {/* Consumed Items */}
              <div className="mt-2">
                {invoice.consumed_items.length === 0 ? (
                  <>
                    <p className="text-sm text-gray-500">No consumed items</p>
                  </>
                ) : (
                  <>
                    <strong>Consumed Items:</strong>

                    <ul className="list-disc pl-5 text-sm">
                      {invoice.consumed_items.map(
                        (consumed: {
                          id: Key | null | undefined;
                          inventory_item: { item_name: string };
                          quantity: number;
                        }) => (
                          <li key={consumed.id}>
                            Inventory Item Name:{" "}
                            {consumed.inventory_item.item_name} — Qty:{" "}
                            {consumed.quantity}
                          </li>
                        )
                      )}
                    </ul>
                  </>
                )}
              </div>
              <button
                onClick={() =>
                  // http://localhost:3001/en/dashboard/sales/sales-invoice/edit?id=1
                  router.push(
                    `/dashboard/sales/sales-invoice/edit?id=${invoice.id}`
                  )
                }
                className="bg-primary text-white px-4 py-1.5 rounded hover:bg-blue-700 transition"
              >
                Edit Invoice
              </button>
            </div>
          )
        )
      )}
    </div>
  );
}
