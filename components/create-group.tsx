"use client"
import { UseGroupStore } from "@/app/state/use-group-store"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pen } from "lucide-react"
import { useState } from "react"

function CreateGroup() {
  const { isSubmitting, handleCreateGroupValidation } = UseGroupStore()
  const [groupName, setGroupName] = useState<string>("")

  const handleCreateGroup = (e: any) => {
    e.preventDefault()

    handleCreateGroupValidation(groupName)
  }
  return (
    <div>


      <Dialog>
        <DialogTrigger asChild>
          <Button className='rounded-full'>
            <Pen />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <form onSubmit={handleCreateGroup} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Create Group</DialogTitle>
              <DialogDescription>
                Group your team members to collaborate and communicate faster.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label htmlFor="name-1">Group Name</Label>
                <Input id="name-1" onChange={(e) => setGroupName(e.target.value)} />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateGroup