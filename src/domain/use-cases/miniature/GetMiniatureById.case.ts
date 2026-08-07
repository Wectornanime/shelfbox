import Miniature from "@/domain/entities/Miniature";
import MiniatureRepository from "@/domain/repositories/miniature.repository";

export default class GetMiniatureCase {
  constructor(private readonly repository: MiniatureRepository) {}

  async execute(id: string): Promise<Miniature | null> {
    if (!id.trim()) throw new Error("The miniature id is required.");

    return this.repository.findById(id);
  }
}
