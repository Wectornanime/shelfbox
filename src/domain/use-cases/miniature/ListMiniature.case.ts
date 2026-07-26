import Miniature from "@/domain/entities/Miniature";
import MiniatureRepository from "@/domain/repositories/miniature.repository";

export default class ListMiniatureCase {
  constructor(private readonly repository: MiniatureRepository) {}

  async execute(): Promise<Miniature[]> {
    return this.repository.findAll();
  }
}
