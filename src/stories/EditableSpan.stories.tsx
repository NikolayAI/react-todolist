import React from "react";
import { EditableSpan } from "../components/EditableSpan/EditableSpan";
import { action } from "@storybook/addon-actions";

export default {
  title: "EditableSpan Component",
  component: EditableSpan,
};

const changeCallback = action("Title changed");

export const EditableSpanBaseExzmple = (props: any) => {
  return <EditableSpan title={"Start title"} onChange={changeCallback} />;
};
