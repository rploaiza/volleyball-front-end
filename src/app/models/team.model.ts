
export class Team {
  public name: string;
  private code: number;
  private score: number;

  constructor(name: string, code?: number, score?: number) {
    this.name = name;
    this.code = code;
    this.score = score;
  }

  getName(): string {
    return this.name;
  }

  getCode(): number {
    return this.code;
  }
}

