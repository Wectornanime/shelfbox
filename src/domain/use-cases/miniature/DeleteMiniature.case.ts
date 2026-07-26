import MiniatureRepository from "@/domain/repositories/miniature.repository";

export default class UpdateMiniatureCase {
  constructor(private readonly repository: MiniatureRepository) {}

  async execute(id: string): Promise<void> {
    if (!id.trim()) throw new Error("The miniature id is required.");

    const miniature = await this.repository.findById(id.trim());

    if (!miniature) throw new Error("Miniature not found.");

    await this.repository.delete(id.trim());

    return;
  }
}
