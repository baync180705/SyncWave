import React from "react";

interface MemberListProps {
  members: string[];
}

export const MemberList: React.FC<MemberListProps> = ({ members }) => {
  return (
    <ul className="space-y-2">
      {members.map((member, index) => (
        <li
          key={index}
          className="px-4 py-2 bg-white/20 rounded-md text-white shadow-sm"
        >
          {member}
        </li>
      ))}
    </ul>
  );
};