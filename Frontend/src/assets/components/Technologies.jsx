import React from 'react'
import {
    Whisper,
    Popover,
    Avatar
} from 'rsuite'
import CustomPopover from "./popovers/CustomPopover";

export default function Technologies() {
  return (
    <div style={{ marginTop: "10px" }}>
      <Whisper
        followCursor
        placement="top"
        speaker={
          <Popover>
            <CustomPopover
              title={"ReactJs"}
              description={"Popular JavaScript front-end library"}
            />
          </Popover>
        }
      >
        <Avatar
          circle
          src="/react.png"
          alt="ReactJs logo"
          style={{ marginRight: "15px" }}
        />
      </Whisper>
      <Whisper
        placement="top"
        followCursor
        speaker={
          <Popover>
            <CustomPopover
              title={"Spring Boot"}
              description={
                "Java framework for building powerful and efficient web apps"
              }
            />
          </Popover>
        }
      >
        <Avatar
          circle
          src="/springboot.png"
          alt="Springboot logo"
          style={{ marginRight: "15px" }}
        />
      </Whisper>
      <Whisper
        followCursor
        placement="top"
        speaker={
          <Popover>
            <CustomPopover title={"PostgreSQL"} description={"Popular, Flexible RDBMS"} />
          </Popover>
        }
      >
        <Avatar
          circle
          src="/postgres.png"
          alt="PostgreSQL Logo"
          style={{ marginRight: "15px" }}
        />
      </Whisper>
    </div>
  );
}
