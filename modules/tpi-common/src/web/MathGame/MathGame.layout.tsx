import React, { useState } from "react";
import { Input, Button, Collapse, Typography, Row, Col } from "antd";
import { BulbTwoTone, ScheduleTwoTone, UnlockTwoTone } from "@ant-design/icons";

const factorial = (n: number): number => {
  return n <= 1 ? 1 : n * factorial(n - 1);
};

const findSumAndProducts = (number: number): number[] => {
  let sum = 0;
  let product = 1;

  for (let int of number.toString()) {
    sum += parseInt(int);
    product = product * parseInt(int);
  }

  return [sum, product];
};

const generateHints = (number: number): string[] => {
  const hints = [];

  number % 2 !== 0
    ? hints.push("It is an odd number")
    : hints.push("It is an even number");

  const [sum, product] = findSumAndProducts(number);
  hints.push(`The sum of the digits is ${sum}`);
  hints.push(`The product of the digits is ${product}`);
  hints.push(`It is a ${number.toString().length} digit number`);

  return hints;
};

const targetNumber = Math.floor(Math.random() * (500 - 0 + 1)) + 0;
const hints = generateHints(targetNumber);

export const MathGame = () => {
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [attempts, setAttempts] = useState(0);

  const handleGuess = () => {
    const numGuess = parseInt(guess);
    setAttempts(attempts + 1);

    if (numGuess === targetNumber) {
      setFeedback(`Correct! You guessed it in ${attempts + 1} attempts.`);
    } else if (numGuess < targetNumber) {
      setFeedback("Too low!");
    } else {
      setFeedback("Too high!");
    }
  };

  return (
    <>
      <h1>Number Guessing Game</h1>
      <p>Guess the number between 1 and 500</p>
      <Row gutter={[24, 24]}>
        <Col span={10}>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Input
                placeholder="Enter your guess"
                size="large"
                type="number"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                disabled={feedback.includes("Correct")}
              />
            </Col>
            <Col span={24}>
              <Button
                onClick={handleGuess}
                disabled={feedback.includes("Correct")}
              >
                Guess
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={2} />
        <Col span={8}>
          <Collapse>
            <Collapse.Panel
              header={"Hints"}
              key={1}
              extra={
                <BulbTwoTone
                  style={{ fontSize: "22px" }}
                  twoToneColor={"blue"}
                />
              }
            >
              {hints.map((hint, index) => (
                <Typography.Paragraph key={index} children={<>{hint}</>} />
              ))}
            </Collapse.Panel>
            {feedback && (
              <Collapse.Panel
                header={"Feedbacks"}
                key={2}
                extra={
                  <ScheduleTwoTone
                    style={{ fontSize: "22px" }}
                    twoToneColor={"red"}
                  />
                }
              >
                <>{feedback}</>
              </Collapse.Panel>
            )}
            {feedback && attempts > 3 && (
              <Collapse.Panel
                header={"Reveal"}
                key={3}
                extra={
                  <UnlockTwoTone
                    style={{ fontSize: "22px" }}
                    twoToneColor={"green"}
                  />
                }
              >
                <>The number you should have guessed is {targetNumber}</>
              </Collapse.Panel>
            )}
          </Collapse>
        </Col>
        <Col span={2} />
      </Row>
      <br />
    </>
  );
};
