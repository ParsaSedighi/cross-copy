"use client";

import { paste } from "@/app/(actions)/pasteActions";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { CopyPlus } from "lucide-react";

import { useTransition, useState } from "react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AnimatePresence, motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { pasteSchema, pasteZFormState } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

const MotionInput = motion.create(Input);
const MotionLabel = motion.create(Label);
const inputRouteVariants = {
  open: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.2, ease: "easeOut" },
  },
  closed: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  },
} as const;

function generateRandomRoute() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function PasteDrawer() {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [routePlaceholder, setRoutePlaceholder] = useState("");

  const form = useForm<pasteZFormState>({
    resolver: zodResolver(pasteSchema),
    mode: "onBlur",
    defaultValues: {
      paste: "",
      isPublic: false,
      route: "",
    },
  });

  const handlePaste = async () => {
    try {
      if (!navigator.clipboard) {
        return;
      }
      const clipboardText = await navigator.clipboard.readText();
      if (typeof clipboardText === "string")
        form.setValue("paste", clipboardText, { shouldDirty: true });
    } catch (err) {
      console.error("Failed to read clipboard: ", err);
    }
  };

  const handleSubmit: SubmitHandler<pasteZFormState> = (formData) => {
    startTransition(async () => {
      const finalRoute = !formData.isPublic
        ? routePlaceholder
        : formData.route || routePlaceholder;
      const result = await paste({ ...formData, route: finalRoute });

      if (result?.error) toast.error(result.error.message);
      else {
        toast.success(result.data.successMessage);
        const random = generateRandomRoute();
        setRoutePlaceholder(random);
        form.reset({ paste: "", isPublic: false, route: "" });

        setIsOpen(false);
      }
    });
  };

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (open) {
          const random = generateRandomRoute();
          setRoutePlaceholder(random);
          form.reset({ paste: "", isPublic: false, route: "" });
        }
      }}>
      <div className="flex justify-end sticky bottom-4">
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={handlePaste}
            className="rounded-full w-16 h-16 [&_svg]:size-5">
            <CopyPlus className="text-secondary-foreground" />
          </Button>
        </DrawerTrigger>
      </div>
      <DrawerContent className="h-5/6">
        <DrawerTitle className="mt-4 ml-4 flex justify-center">
          Add your new paste
        </DrawerTitle>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="h-full flex flex-col mx-4">
            <FormField
              control={form.control}
              name="paste"
              render={({ field }) => (
                <FormItem className="resize-none mt-4 h-full">
                  <FormControl>
                    <Textarea className="resize-none h-full" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isPublic"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="mt-3 flex items-center space-x-3">
                      <Switch
                        id="public-switch"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="public-switch">Make it public</Label>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="route"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-start mt-4 flex-col">
                      <div className="flex items-center space-x-3">
                        <MotionLabel
                          htmlFor="public-input"
                          style={{ transformOrigin: "top" }}
                          initial="closed"
                          animate={
                            form.getValues("isPublic") ? "open" : "closed"
                          }
                          variants={inputRouteVariants}>
                          Route:{" "}
                        </MotionLabel>
                        <MotionInput
                          id="public-input"
                          style={{ transformOrigin: "top" }}
                          initial="closed"
                          animate={
                            form.getValues("isPublic") ? "open" : "closed"
                          }
                          variants={inputRouteVariants}
                          placeholder={routePlaceholder}
                          value={field.value}
                          onChange={field.onChange}
                          className={`${
                            !form.getValues("isPublic")
                              ? "opacity-50 pointer-events-none"
                              : ""
                          } ${
                            form.formState.errors.route
                              ? "border border-red-500"
                              : ""
                          }`}
                        />
                      </div>
                      <AnimatePresence mode="wait">
                        {form.formState.errors.route && (
                          <motion.p
                            key={`error-message-${form.formState.errors.route?.message}`}
                            initial={{ opacity: 0, height: 0, x: 0 }}
                            animate={{
                              opacity: 1,
                              height: "auto",
                              x: [0, -8, 8, -8, 8, 0],
                            }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4 }}
                            className="text-sm text-red-500 mt-1">
                            {form.formState.errors.route.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex justify-center items-center space-x-10 mb-4 mt-8">
              <DrawerClose asChild>
                <Button
                  onClick={() => {
                    const random = generateRandomRoute();
                    setRoutePlaceholder(random);
                    form.reset({
                      paste: "",
                      isPublic: false,
                      route: "",
                    });
                  }}
                  className="w-28"
                  size="lg"
                  variant="secondary">
                  Cancel
                </Button>
              </DrawerClose>
              <Button
                type="submit"
                disabled={isPending || !form.watch("paste")}
                className="w-28"
                size="lg"
                variant="default">
                Done
              </Button>
            </div>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
}
