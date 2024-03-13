export interface ErrorMetaData {
  identifier: string;
  object: any;
}

export class ErrorProps {
  private _errorInfo!: ErrorMetaData[];
  public get errorInfo(): ErrorMetaData[] {
    return this._errorInfo;
  }

  constructor(public readonly error: Error, ...errorInfo: any[]) {
    this._errorInfo = errorInfo.map((_error, index) => ({
      identifier: "" + (index + 1),
      object: _error,
    }));
  }

  equals(other: ErrorProps) {
    return (
      this.error.message === other.error.message &&
      JSON.stringify(this._errorInfo) === JSON.stringify(other._errorInfo)
    );
  }
}
