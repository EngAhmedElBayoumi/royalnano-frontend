"use client";

import { financeRow } from "@/app/[locale]/dashboard/(root)/finance/page";
import CustomSelect from "@/components/formFields/CustomSelect";
import TextInput from "@/components/formFields/TextInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import {
  useCreateFinanceMutation,
  useGetFinanceQuery,
} from "@/redux/services/dashboard/finance/financeApi";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

export interface NewAccountFormValues {
  name: string;
  account_type: string;
  parent: string;
}
export function NewAccountDialog({ id }: { id?: number }) {
  const t = useTranslations("branches.branches_data");
  const [newAccount, { isLoading }] = useCreateFinanceMutation();
  const { data } = useGetFinanceQuery("");
  const parentData = data?.map((item: financeRow) => ({
    value: item.id.toString(),
    label: item.name,
  }));

  const accountTypes = [
    { value: "asset", label: "Asset" },
    { value: "liability", label: "Liability" },
    { value: "equity", label: "Equity" },
    { value: "revenue", label: "Revenue" },
    { value: "expense", label: "Expense" },
  ];
  console.log(id, "id in new account dialog");

  const form = useForm<NewAccountFormValues>({
    defaultValues: {
      name: "",
      account_type: "asset",
      parent: id?.toString() ?? "",
    },
  });

  const onSubmit = (formData: NewAccountFormValues) => {
    console.log("Form submitted with values:", formData);
    // You can handle API submission or state update here
    newAccount(formData)
      .unwrap()
      .then((response) => {
        console.log("Account created successfully:", response);
        form.reset();
      })
      .catch((error) => {
        console.error("Error creating account:", error);
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-[#D9B44A] text-white hover:bg-[#b08c3f] focus:ring-2 focus:ring-[#D9B44A] focus:ring-offset-2 text-xs font-normal"
        >
          New Account
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>New Account</DialogTitle>
              <DialogDescription>
                Create a new account by filling out the form below.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <TextInput
                control={form.control}
                name="name"
                label={t("name")}
                placeholder={t("name")}
              />
              <CustomSelect
                control={form.control}
                name="account_type"
                label="Account Type"
                placeholder="Select Account Type"
                options={accountTypes}
                onChange={(value) =>
                  form.setValue("account_type", value?.toString() ?? "")
                }
              />
              <CustomSelect
                control={form.control}
                name="parent"
                label="Parent Account"
                placeholder="Select Parent Account"
                options={parentData}
                onChange={(value) =>
                  form.setValue("parent", value?.toString() ?? "")
                }
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-[#D9B44A] text-white hover:bg-[#b08c3f] focus:ring-2 focus:ring-[#D9B44A] focus:ring-offset-2"
                disabled={isLoading}
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
