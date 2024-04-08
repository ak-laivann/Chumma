import React from "react";
import { SparesListingProps } from "./SparePartsListing.df";
import { SparesTable, TIIButton } from "@tii/components";
import { Button, Col, Row } from "antd";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

export const SparesListingLayout: React.FunctionComponent<
  SparesListingProps
> = (props: SparesListingProps) => {
  const navigate = useNavigate();

  console.log(props.sparesResponse.getResponse());
  return (
    <>
      <Row gutter={24} justify={"space-between"} align={"middle"}>
        <Col span={12}>
          <TIIButton
            icon={<ReloadOutlined />}
            onClick={props.sparesResponse.triggerRequest}
          />
        </Col>
        <Col span={12}>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={() => navigate("../addSpare")}
            children="Add New Spare"
          />
        </Col>
      </Row>
      <props.sparesResponse.Wrapper>
        <SparesTable {...props.sparesResponse.getResponse()!} />
      </props.sparesResponse.Wrapper>
    </>
  );
};
