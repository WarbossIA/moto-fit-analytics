
        // 1. BASE DE DATOS MEJORADA (Ahora con Marca)
        const baseDeDatosMotos = [
            { modelo: "Ninja 400/500", marca: "kawasaki", estilo: "deportiva", altura: 785, peso: 171 },
            { modelo: "Vulcan S", marca: "kawasaki", estilo: "cruiser", altura: 705, peso: 226 },
            { modelo: "Z400", marca: "kawasaki", estilo: "naked", altura: 785, peso: 167 },
            { modelo: "Rebel 500", marca: "honda", estilo: "cruiser", altura: 690, peso: 191 },
            { modelo: "CBR500R", marca: "honda", estilo: "deportiva", altura: 785, peso: 192 },
            { modelo: "MT-03", marca: "yamaha", estilo: "naked", altura: 780, peso: 168 },
            { modelo: "YZF-R3", marca: "yamaha", estilo: "deportiva", altura: 780, peso: 169 },
            { modelo: "RC 390", marca: "ktm", estilo: "deportiva", altura: 820, peso: 155 },
            { modelo: "450SR", marca: "cfmoto", estilo: "deportiva", altura: 795, peso: 179 },
            { modelo: "FT150", marca: "italika", estilo: "trabajo", altura: 780, peso: 112 }
        ];

        const botonAnalisis = document.querySelector('button');

        botonAnalisis.addEventListener('click', function() {
            
            let entrepierna = document.getElementById('entrepierna').value;
            let peso = document.getElementById('peso').value;
            let marcaElegida = document.getElementById('marca').value;
            let estiloElegido = document.getElementById('estilo').value;

            if(entrepierna === "" || peso === "") {
                alert("⚠️ ALERTA: Ingresa tus datos físicos antes de continuar.");
                return; 
            }

            let cuerpoTabla = document.getElementById('cuerpo-tabla');
            cuerpoTabla.innerHTML = ""; 

            // 2. EL FILTRO MULTIDIMENSIONAL (Marca AND Estilo)
            let motosAAnalizar = baseDeDatosMotos.filter(moto => {
                let coincideMarca = (marcaElegida === "todas" || moto.marca === marcaElegida);
                let coincideEstilo = (estiloElegido === "todas" || moto.estilo === estiloElegido);
                
                // Solo si cumple AMBAS condiciones (o si están en "todas"), la dejamos pasar
                return coincideMarca && coincideEstilo;
            });

            // Si el filtro fue tan estricto que no quedó ninguna moto:
            if(motosAAnalizar.length === 0) {
                cuerpoTabla.innerHTML = `<tr><td colspan="4" class="alerta-amarilla">No hay motos que coincidan con esa combinación de Marca y Estilo.</td></tr>`;
                return;
            }

            // 3. PINTAR LA TABLA
            motosAAnalizar.forEach(moto => {
                let difAltura = entrepierna - moto.altura;
                let estadoAltura = difAltura >= 0 ? "✅ Plantado" : (difAltura >= -30 ? "⚠️ Puntitas" : "❌ No Alcanza");
                let cssAltura = difAltura >= 0 ? "ok-verde" : (difAltura >= -30 ? "alerta-amarilla" : "alerta-roja");

                let ratioPeso = moto.peso / peso; 
                let estadoPeso = ratioPeso <= 1.9 ? "🟢 Ligera" : (ratioPeso <= 2.3 ? "🟡 Equilibrada" : "🔴 Pesada");
                let cssPeso = ratioPeso <= 1.9 ? "ok-verde" : (ratioPeso <= 2.3 ? "alerta-amarilla" : "alerta-roja");

                let nuevaFila = `
                    <tr>
                        <td><strong>${moto.modelo}</strong></td>
                        <td>${moto.marca.toUpperCase()} / <small>${moto.estilo.toUpperCase()}</small></td>
                        <td class="${cssAltura}">${estadoAltura} <br><small>(${moto.altura}mm)</small></td>
                        <td class="${cssPeso}">${estadoPeso} <br><small>(${moto.peso}kg)</small></td>
                    </tr>
                `;
                cuerpoTabla.innerHTML += nuevaFila;
            });
        });