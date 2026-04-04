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
import { useInitials } from "@/hooks/use-initials"
import { Loader2, Pen, Plus } from "lucide-react"
import { useRef, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

function CreateGroup() {
  const { isSubmitting, handleCreateGroupValidation } = UseGroupStore()
  const [groupName, setGroupName] = useState<string>("The Warriors")
  const [file, setFile] = useState<any>()
  const getInitials = useInitials()
  const [preview, setPreview] = useState<any>()
  const uploadRef = useRef<HTMLInputElement>(null)

  const handleCreateGroup = (e: any) => {
    e.preventDefault()

    handleCreateGroupValidation(groupName, file)
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
            <Plus className="h-4 w-4" />
            Create New Group
          </button>
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
              <div className="flex justify-center flex-col items-center gap-2">
                <Avatar className="h-40 w-40 rounded-full">
                  {file
                    ? <AvatarImage src={preview} alt={groupName} />
                    : <AvatarFallback className="rounded-full">{getInitials(groupName)}</AvatarFallback>
                  }
                </Avatar>
                <Button type="button" className="text-xs" onClick={() => uploadRef.current?.click()}>Upload</Button>
              </div>
              <Field>
                <Label htmlFor="name-1">Group Name</Label>
                <Input type="text" id="name-1" onChange={(e) => setGroupName(e.target.value)} value={groupName} />
              </Field>

              <Field className="hidden">
                <Label htmlFor="photo">Group Photo</Label>
                <input ref={uploadRef} type="file" id="photo" onChange={(e) => {
                  const selected = e.target.files?.[0]
                  if (selected) {
                    setFile(selected)
                    setPreview(URL.createObjectURL(selected))
                  }
                }} />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" disabled={isSubmitting}>Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting && <Loader2 className="animate-spin w-4 h-4" />} Create Group</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateGroup