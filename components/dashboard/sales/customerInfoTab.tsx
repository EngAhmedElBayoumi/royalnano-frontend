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
  return (
    <div className="px-6 pb-[10px]">
      {/* Basic Info */}
      <div className="space-y-2">
        <h3 className="font-medium">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <div>
            <p className="text-sm text-muted-foreground">Customer Name</p>
            <p>{customerData?.customer_name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Contact Person</p>
            <p>{customerData?.contact_person}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Phone Number</p>
            <p>{customerData?.phone_number}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p>{customerData?.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Address</p>
            <p>{customerData?.address}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">City</p>
            <p>{customerData?.city}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Country</p>
            <p>{customerData?.country}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Customer Type</p>
            <p>{customerData?.customer_type}</p>
          </div>
        </div>
      </div>

      <hr />

      {/* Additional Info */}
      <div className="space-y-2">
        <h3 className="font-medium">Additional Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <div>
            <p className="text-sm text-muted-foreground">Tax Number</p>
            <p>{customerData?.tax_number}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">National ID</p>
            <p>{customerData?.national_id}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Source</p>
            <p>{customerData?.source}</p>
          </div>
        </div>
      </div>

      <hr />

      {/* Branch Info */}
      <div className="space-y-2">
        <h3 className="font-medium">Branch Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <div>
            <p className="text-sm text-muted-foreground">Branch Name</p>
            <p>{customerData?.branch?.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Branch Code</p>
            <p>{customerData?.branch?.branch_code}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Branch Phone</p>
            <p>{customerData?.branch?.phone_number}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Branch Email</p>
            <p>{customerData?.branch?.email}</p>
          </div>
          <div className="col-span-2 md:col-span-3">
            <p className="text-sm text-muted-foreground">Branch Address</p>
            <p>{customerData?.branch?.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
