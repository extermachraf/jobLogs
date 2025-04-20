import { useState } from "react";
import { useJobContext } from "../JobContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { promptSchema, PromptSchema } from "@/schema/promptSchema";
import { FaArrowUpLong } from "react-icons/fa6";
import useManuallSave from "@/states/ManuallSave";

const PromptForm = () => {
  const { value, setValue } = useManuallSave();
  const form = useForm<PromptSchema>({
    resolver: zodResolver(promptSchema),
    defaultValues: {
      prompt: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: PromptSchema) => {
    console.log("Form submitted:", data);
  };

  return (
    <div>
      <Form {...form}>
        <form className="" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row items-center border py-2 px-7 rounded-full">
                  <FormControl>
                    <Textarea
                      className="focus:outline-none focus:ring-0 focus-visible:ring-0 border-0 h-10 resize-none w-full text-left placeholder:text-left py-5 overflow-hidden"
                      placeholder="enter job description"
                      {...field}
                    />
                  </FormControl>
                  <Button
                    className="rounded-full"
                    type="submit"
                    disabled={!form.formState.isValid}
                  >
                    <FaArrowUpLong className="text-2xl" />
                  </Button>
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="flex items-center justify-end mt-4 mr-4">
        <Button onClick={() => setValue(!value)} className="rounded-full px-5">
          Manually Save
        </Button>
      </div>
    </div>
  );
};

export default PromptForm;
