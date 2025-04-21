import { jobtSchema } from "@/schema/jobSchema";
import useCompanyState from "@/states/Company";
import useJobState from "@/states/Job";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import useManuallSave from "@/states/ManuallSave";
import { Input } from "../ui/input";
import TagInput from "../ui/TagInput";
import { ScrollArea } from "../ui/scroll-area";
import { Checkbox } from "../ui/checkbox";
import { DatePicker } from "../ui/DatePicker";

const JobInput = (props: {
  control: any;
  fieldName: string;
  description: string;
  type?: string;
}) => {
  return (
    <FormField
      control={props.control}
      name={props.fieldName}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div
              className={`text-sm text-gray-500  flex flex-row items-center ${
                props.type !== "date" ? "px-4 border gap-3" : ""
              } rounded-md  w-full`}
            >
              <div className="text-sm dark:text-white/80 text-black/80">
                {props.description}
              </div>
              {props.type === "tag" && (
                <TagInput
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  placeholder=""
                />
              )}
              {props.type === "date" && (
                <DatePicker
                  value={field.value}
                  onChange={(date) => field.onChange(date)}
                />
              )}
              {!props.type && (
                <Input
                  type="text"
                  className="flex-1 focus:outline-none focus:ring-0 focus-visible:ring-0  border-0 rounded-md placeholder:text-sm blaceholder:text p-0"
                  placeholder=""
                  {...field}
                />
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const JobForm = () => {
  const { value, setValue } = useManuallSave();
  const { company, setCompany, resetCompany } = useCompanyState();
  const { job, setJob, resetJob } = useJobState();

  const form = useForm<jobtSchema>({
    resolver: zodResolver(jobtSchema),
    defaultValues: {
      company: {
        name: "",
        description: "",
        location: "",
        size: "",
        specialties: [],
      },
      job: {
        title: "",
        location: "",
        employmentType: "",
        experience: "",
        description: "",
        skills: [],
        salary: "",
        startDate: null,
        remote: false,
      },
      linkdinEmail: {
        email: [],
        linkdin: [],
      },
    },
    mode: "onChange",
  });

  const onSubmit = async (data: jobtSchema) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="lg:grid lg:grid-rows-2 lg:grid-cols-2 flex flex-col  justify-center gap-2"
        >
          <div className="lg:row-span-2 lg:col-span-1  p-4 ">
            <div className="space-y-6">
              <div className="text-center font-semibold">JOB</div>
              <ScrollArea className="h-[700px] p-3">
                <div className="flex flex-col gap-8 ">
                  <div className="grid grid-cols-2 gap-4 justify-center">
                    <JobInput
                      control={form.control}
                      fieldName="job.title"
                      description="Title:"
                    ></JobInput>
                    <JobInput
                      control={form.control}
                      fieldName="job.location"
                      description="Location:"
                    ></JobInput>
                  </div>
                  <div className="grid grid-cols-2 gap-4 justify-center">
                    <JobInput
                      control={form.control}
                      fieldName="job.salary"
                      description="Salary:"
                    ></JobInput>
                    <JobInput
                      control={form.control}
                      fieldName="job.startDate"
                      description=""
                      type="date"
                    ></JobInput>
                  </div>
                  <JobInput
                    control={form.control}
                    fieldName="job.description"
                    description="Description:"
                  ></JobInput>
                  <JobInput
                    control={form.control}
                    fieldName="job.experience"
                    description="Experience:"
                  ></JobInput>
                  <JobInput
                    control={form.control}
                    fieldName="job.skills"
                    description="Skills:"
                    type="tag"
                  ></JobInput>
                  <div className="grid grid-cols-2 gap-4 justify-center">
                    <JobInput
                      control={form.control}
                      fieldName="job.employmentType"
                      description="contract type:"
                    ></JobInput>
                    <FormField
                      control={form.control}
                      name="job.remote"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl className="pl-4">
                            <div className="flex items-center gap-5">
                              <FormLabel>Remote:</FormLabel>
                              <Checkbox
                                id="remote"
                                className=""
                                checked={field.value}
                                onCheckedChange={(checked) =>
                                  field.onChange(checked)
                                }
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <JobInput
                    control={form.control}
                    fieldName="linkdinEmail.email"
                    description="emails:"
                    type="tag"
                  ></JobInput>
                  <JobInput
                    control={form.control}
                    fieldName="linkdinEmail.linkdin"
                    description="linkdins:"
                    type="tag"
                  ></JobInput>
                </div>
              </ScrollArea>
            </div>
          </div>

          <div className="lg:row-span-1 lg:col-span-1  p-4">
            <div className="space-y-6">
              <p className="text-center font font-semibold">COMPANY</p>
              <div className="flex flex-col gap-8 p-3">
                <div className="grid grid-cols-2 gap-4 justify-center">
                  <JobInput
                    control={form.control}
                    fieldName="company.name"
                    description="Name:"
                  ></JobInput>
                  <JobInput
                    control={form.control}
                    fieldName="company.location"
                    description="Location:"
                  ></JobInput>
                </div>
                <div className="grid grid-cols-2 gap-4 justify-center">
                  <JobInput
                    control={form.control}
                    fieldName="company.size"
                    description="Size:"
                  ></JobInput>
                  <JobInput
                    control={form.control}
                    fieldName="company.specialties"
                    description="Specialties:"
                  ></JobInput>
                </div>
                <JobInput
                  control={form.control}
                  fieldName="company.description"
                  description="Description:"
                ></JobInput>
              </div>
            </div>
          </div>
          <div className="lg:row-span-1 lg:col-span-1 p-4">
            <div className=" flex gap-8 justify-end">
              {value && (
                <Button
                  className="rounded-md px-5 "
                  onClick={() => setValue(!value)}
                >
                  use Ai to generate job
                </Button>
              )}
              <Button className="px-5" type="submit">
                Save Job
              </Button>
            </div>
          </div>
          {/* Add more fields as needed */}
        </form>
      </Form>
    </div>
  );
};

export default JobForm;
