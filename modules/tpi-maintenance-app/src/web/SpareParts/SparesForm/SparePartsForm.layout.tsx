import { AsyncGetAndPutUI, Spare, SparesForm } from "@tii/components";
import { SparesFormLayoutProps } from "./SparePartsForm.df";
import { useNavigate } from "react-router";
import { CheckOutlined } from "@ant-design/icons";
import { message } from "antd";

export const SparesFormLayout: React.FC<SparesFormLayoutProps> = (
  props: SparesFormLayoutProps
) => {
  const navigate = useNavigate();
  return (
    <props.asyncSparesUI.Wrapper confirmModalContent="Are you sure you want to create or update this as spares?">
      <SparesForm
        onCancel={() => navigate("..")}
        submitBtnProps={{
          icon: <CheckOutlined />,
          onSubmitClick: (values) => {
            props.asyncSparesUI
              .triggerRequest({
                ...values,
                buId: "TPI",
                id: props.asyncSparesUI.getResponse()?.id,
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
        spareDetails={{
          ...(
            props.asyncSparesUI as AsyncGetAndPutUI<Spare>
          ).asyncUI1.getResponse()!,
        }}
      />
    </props.asyncSparesUI.Wrapper>
  );
};
