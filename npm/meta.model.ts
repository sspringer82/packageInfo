export class NpmMeta {
  constructor(
    public name: string,
    public latestVersion: string,
    public numberOfVersions: number,
    public lastModified: string,
    public license: string,
    public repository: string,
    public website: string,
    public latestNumOfDeps: number,
    public latestNumOfDevDeps: number,
    public latestDeprecated: boolean,
  ) {}
}
