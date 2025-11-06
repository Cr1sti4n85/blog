import { createClient } from "@supabase/supabase-js";

export async function uploadThumbnail(image: File) {
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_API_KEY!;

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase.storage
    .from("thumbnails")
    .upload(`${image.name}_${Date.now()}`, image);

  if (error) {
    throw new Error("Ocurrió un error");
  }

  if (!data || !data.path) {
    throw new Error("No se pudo subir la imagen");
  }

  const urlData = await supabase.storage
    .from("thumbnails")
    .getPublicUrl(data.path!);

  return urlData.data.publicUrl;
}
