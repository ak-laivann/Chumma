import { AsyncGetAndPutUI, Audit, AuditForm } from "@tii/components";
import { AuditFormLayoutProps } from "./AuditForm.df";
import { useNavigate } from "react-router-dom";
import React from "react";
import { CheckOutlined } from "@ant-design/icons";
import { message } from "antd";

export const AuditFormLayout: React.FC<AuditFormLayoutProps> = (
  props: AuditFormLayoutProps
) => {
  const navigate = useNavigate();
  return (
    <props.asyncAuditUI.Wrapper>
      <AuditForm
        auditDetails={{
          ...(
            props.asyncAuditUI as AsyncGetAndPutUI<Audit>
          ).asyncUI1.getResponse()!,
        }}
        readonly={props.disabled}
        showCorrectedImage={props.showCorrectedImage}
        onCancel={() => navigate("..")}
        submitBtnProps={{
          icon: <CheckOutlined />,
          onSubmitClick: (values) => {
            props.asyncAuditUI
              .triggerRequest({
                ...values,
                buId: "TPI",
                id: props.asyncAuditUI.getResponse()?.id,
              })
              .then(() => {
                message.success("Spares has been added");
                navigate("../spares/list");
              })
              .catch(() =>
                message.error("Something went wrong. Please try again.")
              );
          },
          text: "Submit",
        }}
      />
    </props.asyncAuditUI.Wrapper>
  );
};
