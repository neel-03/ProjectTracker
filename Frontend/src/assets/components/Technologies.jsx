import React from "react";
import { Whisper, Popover, Avatar } from "rsuite";
import CustomPopover from "./popovers/CustomPopover";
import { data } from "./../data/popOverData";

export default function Technologies() {
  return (
    <div style={{ marginTop: "10px" }}>
      {data.map((obj, index) => (
        <Whisper
          key={index}
          placement="top"
          speaker={
            <Popover>
              <CustomPopover title={obj.title} description={obj.description} />
            </Popover>
          }
        >
          <Avatar
            circle
            src={obj.src}
            alt={obj.alt}
            style={{ marginRight: "15px", background: "#e1e1e1" }}
          />
        </Whisper>
      ))}
    </div>
  );
}
