"use server";
import { writeFile } from "fs/promises";
import { join } from "path";

interface UploadResponse {
  success: boolean;
  message: string;
  data?: Record<string, unknown>;
}
export async function uploadImage(file: File | null): Promise<UploadResponse> {
  try {

    if (!file) {
      return {
        success: false,
        message: "Aucun fichier fourni.",
      };
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const dest = join(process.cwd(), "public/uploads", file.name);

    await writeFile(dest, buffer);

    return {
      success: true,
      message: "Image uploadée avec succès.",
      data: {
        fileName: file.name,
        url: `/uploads/${file.name}`,
        size: file.size,
        type: file.type,
      },
    };
  } catch {
    return {
      success: false,
      message: "Une erreur est survenue lors de l'upload.",
    };
  }
}
