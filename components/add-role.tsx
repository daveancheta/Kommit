import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UseGroupStore } from '@/app/state/use-group-store'

function AddRole({ isOpen, setIsOpen, user_id, group_id }: {
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
  user_id: string,
  group_id: string
}) {
  const { handleAssignRoleValidation } = UseGroupStore()
  const [role, setRole] = useState<string>("")

  const handleAssignRole = (e: any) => {
    e.preventDefault()

    handleAssignRoleValidation(user_id, group_id, role)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-sm">
        <form className='space-y-4' onSubmit={handleAssignRole}>
          <DialogHeader>
            <DialogTitle>Assign role</DialogTitle>
            <DialogDescription>
              Assign a role for the selected member.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="role-name">Role name</Label>
              <Input
                id="role-name"
                name="name"
                placeholder="e.g. Project Manager"
                autoComplete="off"
                onChange={(e) => setRole(e.target.value)}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={!role}>Assign role</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddRole