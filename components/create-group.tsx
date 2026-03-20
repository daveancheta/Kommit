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
  const [file, setFile] = useState<any>()

  const handleCreateGroup = (e: any) => {
    e.preventDefault()

      console.log("groupName:", groupName)
    console.log("file:", file)

    handleCreateGroupValidation(groupName, file)
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
                <Input type="text" id="name-1" onChange={(e) => setGroupName(e.target.value)} />
              </Field>

                <Field>
                <Label htmlFor="photo">Group Photo</Label>
                <input type="file" id="photo" onChange={(e) => setFile(e.target.files?.[0])} />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" disabled={isSubmitting}>Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting}>Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateGroup