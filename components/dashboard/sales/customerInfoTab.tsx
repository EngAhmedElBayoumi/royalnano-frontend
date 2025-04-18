import { useTranslations } from "next-intl";

interface CustomerInfoTabProps {
  customerData: {
    customer_name: string;
    contact_person: string;
    phone_number: string;
    email: string;
    address: string;
    city: string;
    country: string;
    branch: {
      name: string;
      branch_code: string;
      phone_number: string;
      email: string;
      address: string;
    };
    customer_type: string;
    tax_number: string;
    national_id: string;
    source: string;
  };
}

export default function CustomerInfoTab({
  customerData,
}: CustomerInfoTabProps) {
  const t = useTranslations("customer_info");

  return (
    <div className="px-6 pb-[10px]">
      {/* Basic Info */}
      <div className="space-y-2">
        <h3 className="font-medium">{t("basic_info")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <div>
            <p className="text-sm text-muted-foreground">
              {t("fields.customer_name")}
            </p>
            <p>{customerData?.customer_name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              {t("fields.contact_person")}
            </p>
            <p>{customerData?.contact_person}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              {t("fields.phone_number")}
            </p>
            <p>{customerData?.phone_number}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{t("fields.email")}</p>
            <p>{customerData?.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              {t("fields.address")}
            </p>
            <p>{customerData?.address}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{t("fields.city")}</p>
            <p>{customerData?.city}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              {t("fields.country")}
            </p>
            <p>{customerData?.country}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              {t("fields.customer_type")}
            </p>
            <p>{customerData?.customer_type}</p>
          </div>
        </div>
      </div>

      <hr />

      {/* Additional Info */}
      <div className="space-y-2">
        <h3 className="font-medium">{t("additional_info")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <div>
            <p className="text-sm text-muted-foreground">
              {t("fields.tax_number")}
            </p>
            <p>{customerData?.tax_number}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              {t("fields.national_id")}
            </p>
            <p>{customerData?.national_id}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              {t("fields.source")}
            </p>
            <p>{customerData?.source}</p>
          </div>
        </div>
      </div>

      <hr />

      {/* Branch Info */}
      <div className="space-y-2">
        <h3 className="font-medium">{t("branch_info")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <div>
            <p className="text-sm text-muted-foreground">
              {t("fields.branch_name")}
            </p>
            <p>{customerData?.branch?.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              {t("fields.branch_code")}
            </p>
            <p>{customerData?.branch?.branch_code}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              {t("fields.branch_phone")}
            </p>
            <p>{customerData?.branch?.phone_number}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              {t("fields.branch_email")}
            </p>
            <p>{customerData?.branch?.email}</p>
          </div>
          <div className="col-span-2 md:col-span-3">
            <p className="text-sm text-muted-foreground">
              {t("fields.branch_address")}
            </p>
            <p>{customerData?.branch?.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
