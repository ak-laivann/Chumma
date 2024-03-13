export class LoaderProps {
  constructor(public readonly percentLoaded: number | "idle") {
    if (
      percentLoaded != Infinity &&
      //@ts-ignore
      (percentLoaded > 100 || percentLoaded < 0)
    ) {
      throw new Error(
        `WTH: Wrong code. completion % is invalid: ${percentLoaded}`
      );
    }
  }

  equals(other: LoaderProps) {
    return this.percentLoaded === other.percentLoaded;
  }
}
