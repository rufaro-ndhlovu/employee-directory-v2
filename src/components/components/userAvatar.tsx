"use client";

import React from "react";
import Avatar from "@mui/material/Avatar";

export default function UserAvatar({ user, avatarStyle }: any) {
    if (!user) {
        return <Avatar />
    }

  return (
    <>
      <Avatar 
        alt={`${user.firstName} ${user.lastName}`} 
        src={user.userPhotoUrl }
        sx={avatarStyle}
        >
            {!user.userPhotoUrl && user.firstName?.[0]}
        </Avatar>
    </>
  );
}
