const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImage(inputPath, outputPath, quality = 80) {
  try {
    const stats = fs.statSync(inputPath);
    const originalSize = stats.size;
    
    console.log(`Otimizando: ${inputPath}`);
    console.log(`Tamanho original: ${(originalSize / 1024).toFixed(2)} KB`);
    
    await sharp(inputPath)
      .jpeg({ quality, progressive: true })
      .toFile(outputPath);
    
    const newStats = fs.statSync(outputPath);
    const newSize = newStats.size;
    const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(2);
    
    console.log(`Tamanho otimizado: ${(newSize / 1024).toFixed(2)} KB`);
    console.log(`Redução: ${reduction}%\n`);
    
    return { originalSize, newSize, reduction };
  } catch (error) {
    console.error(`Erro ao otimizar ${inputPath}:`, error);
    return null;
  }
}

async function main() {
  const imagesDir = path.join(__dirname, 'attached_assets', 'generated_images');
  
  // Lista das imagens pesadas identificadas
  const imagesToOptimize = [
    '90s_music_hero_background_d7797857.png',
    'music_video_thumbnail_design_4769ff88.png',
    '90s_remix_pack_cover_cf424b48.png'
  ];
  
  console.log('🖼️  Iniciando otimização de imagens...\n');
  
  let totalOriginalSize = 0;
  let totalNewSize = 0;
  
  for (const imageName of imagesToOptimize) {
    const inputPath = path.join(imagesDir, imageName);
    const outputPath = path.join(imagesDir, imageName.replace('.png', '_optimized.jpg'));
    
    if (fs.existsSync(inputPath)) {
      const result = await optimizeImage(inputPath, outputPath, 85);
      if (result) {
        totalOriginalSize += result.originalSize;
        totalNewSize += result.newSize;
      }
    } else {
      console.log(`⚠️  Arquivo não encontrado: ${inputPath}`);
    }
  }
  
  const totalReduction = ((totalOriginalSize - totalNewSize) / totalOriginalSize * 100).toFixed(2);
  
  console.log('📊 Resumo da otimização:');
  console.log(`Tamanho total original: ${(totalOriginalSize / 1024).toFixed(2)} KB`);
  console.log(`Tamanho total otimizado: ${(totalNewSize / 1024).toFixed(2)} KB`);
  console.log(`Redução total: ${totalReduction}%`);
  console.log('\n✅ Otimização concluída!');
  console.log('\n📝 Próximos passos:');
  console.log('1. Atualize as referências nos componentes para usar as imagens otimizadas');
  console.log('2. Remova as imagens originais após confirmar que tudo funciona');
}

main().catch(console.error);