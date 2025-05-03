$ErrorActionPreference = "Stop"
$VERSION = "1.25.05.03.1"
$PROJECT = "carscrapping-api"
$REGISTRY_NAME = "southamerica-west1-docker.pkg.dev/carscrapping/carscrapping-images"
$FULL_IMAGE_NAME = "${REGISTRY_NAME}/${PROJECT}:${VERSION}"

Write-Output "[STAGE 1] Construyendo la imagen de Docker..."
docker build -f dockerfile.prod -t $PROJECT .

Write-Output "[STAGE 2] Etiquetando la imagen..."
docker tag $PROJECT $FULL_IMAGE_NAME

Write-Output "[STAGE 3] Autenticando en Google Cloud..."
gcloud auth login
gcloud auth configure-docker southamerica-west1-docker.pkg.dev

Write-Output "[STAGE 4] Subiendo la imagen a Google Container Registry..."
docker push $FULL_IMAGE_NAME
