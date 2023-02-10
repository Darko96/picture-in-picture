const videoElement = document.getElementById("video");
const button = document.getElementById("button");

// Prompt to select media stream, pass to video element, then play
async function selectMediaStream() {
  try {
    // Kreiramo konstantu koja ce imati podatke u vidu objekta o klipu koji smo izabrali
    // i koji zelimo da pustimo, dakle cekamo dok korisnik ne odabre klip
    // Ova funkcija u sustini zahteva od korisnika da odabere video izvor
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    // Onda postavljamo da nas html element (videoElement) sadrzi taj objekat kao src tj link
    // za prikazivanje koji dobija od mediaStream konstante
    // U sustini dodeljuje izabrani izvor videa elementu
    videoElement.srcObject = mediaStream;
    // Onda kada je taj video ucitaj, tj treba da znamo da ce
    // onloadedmetadata biti true kada se zavrsi ucitavanje i onda ce se pozvati arrow funckija
    // koja ce da pusti taj video
    videoElement.onloadedmetadata = () => {
      // Kada se video ucita, ova funkcija pokreće video
      videoElement.play();
    };
  } catch (error) {
    // Catch Error Here
    console.log("whoops, error here:", error);
  }
}

// Dugme ima event listener koji poziva funkciju "videoElement.requestPictureInPicture"
// kada se klikne, što omogućava funkciju Picture in Picture.
// Nakon što se funkcija izvrši, dugme se ponovo omogućava.
button.addEventListener("click", async () => {
  // Disable Button
  // Postavljamo da dugme nije aktivno i da na dugme nije moguce kliknuti
  button.disabled = true;
  // Start Picture in Picture
  // Ova funkcija nam omogucava Picture in Picture funkcionalnost, tako da kada
  // kliknemo na dugme onda cemo dobiti tu funkcionalnost
  // Ako vrati true onda kod nastavlja da se izvrsava, ako vrati false onda se ne nastavlja
  await videoElement.requestPictureInPicture();
  // Reset Button
  // Ponovo aktiviramo dugme
  button.disabled = false;
  console.log("daa");
});

// On Load
// Funkcija "selectMediaStream" se poziva automatski prilikom učitavanja stranice.
selectMediaStream();
