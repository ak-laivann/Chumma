import { AsyncGetAndPutUI, Spare, SparesForm } from "@tii/components";
import { SparesFormLayoutProps } from "./SpareParts.df";
import { useNavigate } from "react-router";
import { CheckOutlined } from "@ant-design/icons";
import { message } from "antd";

export const SparesFormLayout: React.FC<SparesFormLayoutProps> = (
  props: SparesFormLayoutProps
) => {
  const navigate = useNavigate();
  return (
    <SparesForm
      onCancel={() => navigate("..")}
      submitBtnProps={{
        icon: <CheckOutlined />,
        onSubmitClick: (values) => {
          props.asyncSparesUI
            .triggerRequest({ ...values, buId: "TPI" })
            .then(() => {
              message.success("Spares has been added");
              navigate("../");
            })
            .catch(() =>
              message.error("Something went wrong. Please try again.")
            );
        },
        text: "Submit",
      }}
      spareDetails={
        (props.asyncSparesUI as AsyncGetAndPutUI<Spare>).asyncUI1.getResponse()!
      }
    />
  );
};
