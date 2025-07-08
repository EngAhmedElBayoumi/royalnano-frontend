'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

const WarehouseListPage = () => {
  const router = useRouter();
  const params = useParams();
  const { locale } = params;

  useEffect(() => {
    // Redirect to the main purchase page with warehouse tab
    router.replace(`/${locale}/dashboard/purchase?tab=warehouse`);
  }, [router, locale]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>Redirecting to warehouse management...</div>
    </div>
  );
};

export default WarehouseListPage;

