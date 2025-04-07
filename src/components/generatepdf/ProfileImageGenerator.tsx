'use client';

import React, { useEffect, useRef } from 'react';
import { StaticCanvas } from 'fabric';

import { headwearParts } from '@/components/character-editor/headwear-parts';
import { headParts } from '@/components/character-editor/head-parts';
import { patternParts } from '@/components/character-editor/patterns';
import torso from '@/assets/character-editor/body/torso.png';
import hands from '@/assets/character-editor/body/hands.png';

import { loadImage, applyInvertFilter, createSVG, SVG_SLEEVE, SVG_TORSO } from '@/utils/canvasUtils';

export default function ProfileImageGenerator({ urlImage }: { urlImage: string }) {
    const scaleFactor = 0.3;
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    console.log('URL de la imagen:', urlImage);

    // Extrer los parámetros de la URL, haciendo un split. EX: /cardgenerator/276396/0/0/0/002966/white
    const params = urlImage.split('/');
    const userId = params[2];
    const headwearId = params[3];
    const headId = params[4];
    const patternId = params[5];
    const playerColor = params[6];
    const patternTone = params[7];
    
    useEffect(() => {
        const partCategories = [headParts, headwearParts, patternParts];
        const selectedImages = [
            partCategories[0][Number(headwearId)],
            partCategories[1][Number(headId)],
            partCategories[2][Number(patternId)],
        ];

        if (!canvasRef.current) return;

        const canvas = new StaticCanvas(canvasRef.current, {
            width: 100,
            height: 100,
        });

        // Cargar y agregar las imágenes al canvas
        const loadAndDrawImages = async () => {
            try {
                
                // Figura 1
                await loadAndAddImage(torso.src, { left: (-90 * scaleFactor), top: (-8 * scaleFactor), scaleX: (0.5 * scaleFactor), scaleY: (0.5 * scaleFactor) }, canvas);
                const svg1 = await createSVG(SVG_SLEEVE.replace(/COLOR/g, playerColor), true);
                if (svg1) {
                    svg1.set({ left: (50 * scaleFactor), top: (208 * scaleFactor), scaleX: (0.5 * scaleFactor), scaleY: (0.5 * scaleFactor) });
                    canvas.add(svg1);
                }
                const svg2 = await createSVG(SVG_TORSO.replace(/COLOR/g, playerColor));
                if (svg2) {
                    svg2.set({ left: (85 * scaleFactor), top: (196 * scaleFactor), scaleX: (0.5 * scaleFactor), scaleY: (0.5 * scaleFactor) });
                    canvas.add(svg2);
                }
                await loadAndAddImage(hands.src, { left: (-90 * scaleFactor), top: (-8 * scaleFactor), scaleX: (0.5 * scaleFactor), scaleY: (0.5 * scaleFactor) }, canvas);

                // Partes seleccionadas en figura 1
                for (let i = 0; i < selectedImages.length; i++) {
                    const part = selectedImages[i];
                    if (!part) continue;
                    const img = await loadImage(part.src.src, { left: (-90 * scaleFactor), top: (-8 * scaleFactor), scaleX: (0.5 * scaleFactor), scaleY: (0.5 * scaleFactor) });
                    applyInvertFilter(img, patternTone === 'black' && i === 2);
                    canvas.add(img);
                }

                // Renderizar todo
                canvas.renderAll();
                
            } catch (error) {
                console.error(error);
            }
        };

        const loadAndAddImage = async (src: string, options: object | undefined, canvas: StaticCanvas) => {
            const img = await loadImage(src, options);
            canvas.add(img);
        };

        loadAndDrawImages()
        
        return () => {
            canvas.dispose(); // Cleanup
        };
    }, [headId, headwearId, patternId, patternTone, playerColor, userId,]);

    return (
        <canvas className='rounded-full border-6 border-[#A53F42]' ref={canvasRef} width={100} height={100} style={{ backgroundColor:'#f75e63' }} />
    );
}