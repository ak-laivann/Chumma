import React from "react";
import { TIIButton } from "./TIIButtonAndLink";
import { FormFooterProps as props } from "../../props";
import { Row, Col, Space, Button } from "antd";
import styled from "styled-components";

const FooterDiv = styled.div`
  position: sticky;
  z-index: 5;
  bottom: 0;
  padding: 0px 8px;
  user-select: none;
  background-color: #fff;
  box-shadow: 0px -5px 10px -8px rgba(0, 0, 0, 0.5);
`;

export const TIIFormFooter = React.memo((props: props) => {
  return (
    <FooterDiv>
      <Row
        justify="space-between"
        align="middle"
        style={{ padding: "16px 0px" }}
        gutter={[4, 16]}
      >
        <Col>{props.leftView && props.leftView}</Col>
        <Col>
          <Space size={5}>
            {props.secondaryLink && (
              <Button
                type="link"
                data-testid="FormFooter-secondaryLink"
                icon={<>{props.secondaryLink.icon}</>}
                onClick={() => props.secondaryLink?.onSubmitClick?.(undefined)}
                disabled={props.secondaryLink.disabled ?? props.footerDisabled}
              >
                {props.secondaryLink?.text}
              </Button>
            )}
            {props.draft && (
              <TIIButton
                size="large"
                htmlType="submit"
                data-testid="FormFooter-draft"
                icon={<>{props.draft?.icon}</>}
                onClick={props.draft.onSubmitClick}
                disabled={props.draft.disabled ?? props.footerDisabled}
                ref={props.draft?.ref}
              >
                {props.draft?.text}
              </TIIButton>
            )}

            {props.submit && (
              <TIIButton
                size="large"
                type="primary"
                htmlType="submit"
                data-testid="FormFooter-submit"
                icon={<>{props.submit.icon}</>}
                onClick={props.submit.onSubmitClick}
                disabled={props.submit.disabled ?? props.footerDisabled}
                ref={props.submit.ref}
              >
                {props.submit.text}
              </TIIButton>
            )}
          </Space>
        </Col>
      </Row>
    </FooterDiv>
  );
});
