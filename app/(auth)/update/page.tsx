"use client";

import Header from "@/components/shared/Header";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Cookies from "js-cookie";

import { Button } from "@/components/ui/button";
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { DateFormatter } from "@/components/helpers/DateFormatter";
import { Axios } from "@/utils/Axios";

const formSchema = z.object({
  gameNumber: z.string({ required_error: "You must select game number" }),
  gameResultPatti: z
    .string()
    .min(3, { message: "Patti number but be 3 characters" }),
  gameResultNumber: z
    .string()
    .max(1, { message: "It can only be a single digit" }),
});

const Update = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gameResultPatti: "",
      gameResultNumber: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    const formattedDate = DateFormatter();

    // get token

    try {
      const token = Cookies.get("ff-admin-token");

      if (!token) throw new Error("No token");

      const headers = {
        "ff-admin-token": token,
      };

      const data = {
        gameNumber: value.gameNumber,
        date: formattedDate,
        gameResultPatti: value.gameResultPatti,
        gameResultNumber: value.gameResultNumber,
      };

      const postData = await Axios.post("/admin/update", data, { headers });

      const response = await postData.data;

      console.log(response);

      toast({
        title: "Success",
        description: "Data has been updated",
      });
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Something went wrong",
        description: error.response.data.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <Header title="Update Data" />
      <div className="flex flex-col items-center justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="gameNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Game Number" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="one">one</SelectItem>
                      <SelectItem value="two">two</SelectItem>
                      <SelectItem value="three">three</SelectItem>
                      <SelectItem value="four">four</SelectItem>
                      <SelectItem value="five">five</SelectItem>
                      <SelectItem value="six">six</SelectItem>
                      <SelectItem value="seven">seven</SelectItem>
                      <SelectItem value="eight">eight</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gameResultPatti"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patti Result</FormLabel>
                  <FormControl>
                    <Input placeholder="eg: 123" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gameResultNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patti Result</FormLabel>
                  <FormControl>
                    <Input placeholder="eg: 1" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full md:w-60">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Update;
