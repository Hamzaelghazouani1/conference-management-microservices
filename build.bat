@echo off
echo ============================================
echo Building Conference Management Application
echo ============================================

REM Build Maven projects
echo.
echo Building Maven projects...
call mvn clean package -DskipTests

if %ERRORLEVEL% neq 0 (
    echo Maven build failed!
    exit /b 1
)

echo.
echo ============================================
echo Building Docker images...
echo ============================================

REM Build Docker images
docker-compose build

echo.
echo ============================================
echo Build completed successfully!
echo ============================================
echo.
echo To start all services, run:
echo   docker-compose up -d
echo.
echo To view logs:
echo   docker-compose logs -f
echo.
echo To stop all services:
echo   docker-compose down

