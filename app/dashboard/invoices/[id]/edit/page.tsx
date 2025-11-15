import { Metadata } from 'next';
import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'Edit Invoice',
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await params in Next.js 15
  const { id } = await params;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    return <div>Invoice not found</div>;
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}