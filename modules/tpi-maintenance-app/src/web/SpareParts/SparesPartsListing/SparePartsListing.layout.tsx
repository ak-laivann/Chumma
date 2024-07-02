import React from "react";
import { SparesListingProps } from "./SparePartsListing.df";
import { SparesTable, TIIButton } from "@tii/components";
import { Col, Row, Tabs } from "antd";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export const SparesListingLayout: React.FunctionComponent<
  SparesListingProps
> = (props: SparesListingProps) => {
  const navigate = useNavigate();

  return (
    <>
      <Tabs
        tabBarExtraContent={{
          right: (
            <>
              <Row gutter={24} justify={"space-between"} align={"middle"}>
                <Col>
                  <TIIButton
                    icon={<ReloadOutlined />}
                    onClick={props.sparesResponse.triggerRequest}
                  />
                </Col>
                <Col>
                  <TIIButton
                    icon={<PlusOutlined />}
                    onClick={() => navigate("../add")}
                    children="Add New Spare"
                    type="primary"
                  />
                </Col>
              </Row>
            </>
          ),
        }}
      >
        <Tabs.TabPane tab="Spares">
          <props.sparesResponse.Wrapper>
            <SparesTable {...props.sparesResponse.getResponse()!} />
          </props.sparesResponse.Wrapper>
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};
