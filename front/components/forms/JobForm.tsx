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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import useManuallSave from "@/states/ManuallSave";
import { Input } from "../ui/input";
import TagInput from "../ui/TagInput";
import { ScrollArea } from "../ui/scroll-area";
import { Checkbox } from "../ui/checkbox";
import { DatePicker } from "../ui/DatePicker";
import axios from "axios";
import { toast } from "sonner";

const JobInput = (props: {
  control: any;
  fieldName: string;
  description: string;
  type?: string;
}) => {
  const contract = ["CDI", "CDD", "freelence"];
  return (
    <FormField
      control={props.control}
      name={props.fieldName}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div
              className={`text-sm text-gray-500  flex flex-row items-center ${
                props.type !== "contract type" ? "px-4 border gap-3" : ""
              } rounded-md  w-full`}
            >
              {props.type !== "contract type" && (
                <div className="text-sm dark:text-white/80 text-black/80">
                  {props.description}
                </div>
              )}
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
              {props.type === "contract type" && (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <div className="flex items-center justify-around w-full">
                    <SelectTrigger className="w-full focus:outline-none focus:ring-0 focus-visible:ring-0  rounded-md placeholder:text-sm blaceholder:text">
                      <SelectValue placeholder="Select contract type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {contract.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </div>
                </Select>
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
    const backurl = process.env.NEXT_PUBLIC_BACKEND_URL;
    try {
      const payload: any = {
        job: data.job,
        email: data.linkdinEmail.email,
        profileUrl: data.linkdinEmail.linkdin,
      };

      if (data.company.name.trim() !== "") {
        payload.company = data.company;
      }

      console.log(backurl);
      const response = await axios.post(`${backurl}/job-saver`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        console.log("Job saved successfully:", response.data);
        form.reset();
        toast.success("Job created successfully", {
          description: "The job has been saved successfully.",
          style: {
            backgroundColor: "green",
            color: "white",
          },
          duration: 5000, // Set max time to 5 seconds
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Error saving job:", error.response?.data);
        toast.error(
          <div>
            {error.response?.data?.message?.map(
              (message: string, key: number) => (
                <p key={key}>{message}</p>
              )
            )}
          </div>,
          {
            style: {
              backgroundColor: "red",
              color: "white",
            },
          }
        );
      }
    }
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
              <ScrollArea className="p-3">
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
                      type="contract type"
                      control={form.control}
                      fieldName="job.employmentType"
                      description="contract type:"
                    ></JobInput>
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
