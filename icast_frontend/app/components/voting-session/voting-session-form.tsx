import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "../../components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Switch } from "../../components/ui/switch"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { DateTimePicker } from "../../components/ui/date-time-picker"

const formSchema = z.object({
  session_title: z.string().min(2, "Title must be at least 2 characters."),
  description: z.string().optional(),
  start_date: z.date(),
  end_date: z.date(),
  is_active: z.boolean(),
  allow_anonymous_voting: z.boolean(),
})

type FormValues = z.infer<typeof formSchema>

interface VotingSessionFormProps {
  onSubmit: (data: FormValues) => void
  initialData?: Partial<FormValues>
}

export function VotingSessionForm({ onSubmit, initialData }: VotingSessionFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      session_title: "",
      description: "",
      start_date: new Date(),
      end_date: new Date(),
      is_active: false,
      allow_anonymous_voting: false,
    },
  })

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Voting Session</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="session_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Session Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter session title" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter session description" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        date={field.value}
                        setDate={(date) => field.onChange(date)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        date={field.value}
                        setDate={(date) => field.onChange(date)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="is_active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between space-x-3 space-y-0 rounded-md border p-4">
                    <div className="space-y-1">
                      <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Active
                      </FormLabel>
                      <FormDescription className="text-sm text-muted-foreground">
                        Set the voting session as active or inactive
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="allow_anonymous_voting"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between space-x-3 space-y-0 rounded-md border p-4">
                    <div className="space-y-1">
                      <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Allow Anonymous Voting
                      </FormLabel>
                      <FormDescription className="text-sm text-muted-foreground">
                        Enable or disable anonymous voting for this session
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="ml-auto" onClick={form.handleSubmit(onSubmit)}>Save Voting Session</Button>
      </CardFooter>
    </Card>
  )
}