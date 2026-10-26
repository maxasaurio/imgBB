//formulario
const form_upload = document.querySelector('#uploadForm');
//archivo que voy asubir
const fileUpload = form_upload.imagen
//contenedor de resultado/imagenes al usuario
const resultDiv = document.querySelector('#result');

form_upload.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', fileUpload.files[0]);
    subirImagen(formData);
})
const subirImagen = async (formData) => {
    const apiKey='55226dc2a59618239f511da52b918e25'
    resultDiv.innerHTML = '<p>Subiendo imagen porfavor espere...</p>'
    try{
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
            method: 'POST',
            body: formData
    })
    const data = await response.json();
    console.log(data)
       // Procesamos la respuesta del servidor
      if (data.success) {

      const imageUrl = data.data.url; // URL de la imagen subida

      resultDiv.innerHTML = `
        <p style="color: green;">¡Imagen subida con éxito!</p>
        <a href="${imageUrl}" target="_blank">Ver enlace directo</a>
        <br><br>
        <img src="${imageUrl}" alt="Subida" style="max-width: 300px; display: block; margin-top: 10px;" />
      `;

    } else {
      resultDiv.innerHTML = `<p style="color: red;">Error de ImgBB: ${data.error.message}</p>`;
    }

}catch(error){
    console.error('Error en la petición:', error);
    resultDiv.innerHTML = '<p style="color: red;">Ocurrió un error al conectar con el servidor.</p>';
}}
