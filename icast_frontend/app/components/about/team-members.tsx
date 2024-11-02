import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface TeamMemberProps {
  name: string;
  role: string;
  imageUrl: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, imageUrl }) => {
  return (
    <div className="flex flex-col items-center">
      <Avatar className="w-24 h-24">
        <AvatarImage src={imageUrl} alt={name} />
        <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
      </Avatar>
      <h3 className="mt-4 text-lg font-semibold">{name}</h3>
      <p className="text-sm text-muted-foreground">{role}</p>
    </div>
  )
}

export default TeamMember