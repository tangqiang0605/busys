-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "role_id" JSON NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "metadata" JSON NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Role" (
    "role_id" SERIAL NOT NULL,
    "role_name" VARCHAR(100) NOT NULL,
    "allowed_routes" JSON NOT NULL,
    "allowed_actions" JSON NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "DriverInfo" (
    "driver_id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "license_number" VARCHAR(20) NOT NULL,
    "license_type" VARCHAR(10) NOT NULL,
    "license_expiry_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DriverInfo_pkey" PRIMARY KEY ("driver_id")
);

-- CreateTable
CREATE TABLE "DriverSchedule" (
    "schedule_id" SERIAL NOT NULL,
    "driver_id" INTEGER NOT NULL,
    "fixed_schedule_id" INTEGER NOT NULL,
    "extra_schedule_id" INTEGER,

    CONSTRAINT "DriverSchedule_pkey" PRIMARY KEY ("schedule_id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "employee_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "gender" VARCHAR(10) NOT NULL,
    "address" VARCHAR(100) NOT NULL,
    "phone_number" VARCHAR(15) NOT NULL,
    "id_type" VARCHAR(50) NOT NULL,
    "id_number" VARCHAR(50) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("employee_id")
);

-- CreateTable
CREATE TABLE "PassengerFeedback" (
    "feedback_id" SERIAL NOT NULL,
    "driver_id" INTEGER,
    "route_schedule_id" INTEGER,
    "feedback_date" TIMESTAMP(3) NOT NULL,
    "score" DOUBLE PRECISION,
    "comments" TEXT,

    CONSTRAINT "PassengerFeedback_pkey" PRIMARY KEY ("feedback_id")
);

-- CreateTable
CREATE TABLE "MaintenanceRequest" (
    "request_id" SERIAL NOT NULL,
    "request_date" TIMESTAMP(3) NOT NULL,
    "request_description" TEXT NOT NULL,
    "request_type" VARCHAR(50) NOT NULL,
    "maintenance_type" VARCHAR(50) NOT NULL,
    "maintenance_id" TEXT NOT NULL,
    "approval_status" VARCHAR(20) NOT NULL,

    CONSTRAINT "MaintenanceRequest_pkey" PRIMARY KEY ("request_id")
);

-- CreateTable
CREATE TABLE "VehicleMaintenance" (
    "maintenance_id" SERIAL NOT NULL,
    "vehicle_id" INTEGER NOT NULL,
    "request_id" INTEGER NOT NULL,
    "staff_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "maintenanceRequestRequest_id" INTEGER,

    CONSTRAINT "VehicleMaintenance_pkey" PRIMARY KEY ("maintenance_id")
);

-- CreateTable
CREATE TABLE "Route" (
    "route_id" SERIAL NOT NULL,
    "route_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("route_id")
);

-- CreateTable
CREATE TABLE "RouteDetail" (
    "detail_id" SERIAL NOT NULL,
    "route_id" INTEGER NOT NULL,
    "station_id" INTEGER NOT NULL,
    "station_order" INTEGER NOT NULL,

    CONSTRAINT "RouteDetail_pkey" PRIMARY KEY ("detail_id")
);

-- CreateTable
CREATE TABLE "RouteSchedule" (
    "schedule_id" SERIAL NOT NULL,
    "route_id" INTEGER NOT NULL,
    "schedule_name" TEXT NOT NULL,
    "start_time" TIME NOT NULL,
    "end_time" TIME NOT NULL,

    CONSTRAINT "RouteSchedule_pkey" PRIMARY KEY ("schedule_id")
);

-- CreateTable
CREATE TABLE "Station" (
    "station_id" SERIAL NOT NULL,
    "station_name" VARCHAR(100) NOT NULL,
    "location" VARCHAR(255) NOT NULL,

    CONSTRAINT "Station_pkey" PRIMARY KEY ("station_id")
);

-- CreateTable
CREATE TABLE "StationSurveillance" (
    "surveillance_id" SERIAL NOT NULL,
    "facility_id" INTEGER NOT NULL,
    "station_id" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "passenger_count" INTEGER NOT NULL,

    CONSTRAINT "StationSurveillance_pkey" PRIMARY KEY ("surveillance_id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "vehicle_id" SERIAL NOT NULL,
    "license_plate" VARCHAR(20) NOT NULL,
    "vehicle_type" VARCHAR(50) NOT NULL,
    "capacity" INTEGER NOT NULL,
    "purchase_date" TIMESTAMP(3) NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "vehicle_name" VARCHAR(100) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "manufacturer" VARCHAR(100) NOT NULL,
    "model" VARCHAR(50) NOT NULL,
    "image_url" TEXT,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("vehicle_id")
);

-- CreateTable
CREATE TABLE "VehicleOperation" (
    "operation_id" SERIAL NOT NULL,
    "vehicle_id" INTEGER NOT NULL,
    "route_id" INTEGER NOT NULL,
    "driver_id" INTEGER NOT NULL,

    CONSTRAINT "VehicleOperation_pkey" PRIMARY KEY ("operation_id")
);

-- CreateTable
CREATE TABLE "_UserRole" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UserRole_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "DriverInfo_employee_id_key" ON "DriverInfo"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_license_plate_key" ON "Vehicle"("license_plate");

-- CreateIndex
CREATE INDEX "_UserRole_B_index" ON "_UserRole"("B");

-- AddForeignKey
ALTER TABLE "DriverInfo" ADD CONSTRAINT "DriverInfo_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriverSchedule" ADD CONSTRAINT "DriverSchedule_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "DriverInfo"("driver_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PassengerFeedback" ADD CONSTRAINT "PassengerFeedback_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "DriverInfo"("driver_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PassengerFeedback" ADD CONSTRAINT "PassengerFeedback_route_schedule_id_fkey" FOREIGN KEY ("route_schedule_id") REFERENCES "RouteSchedule"("schedule_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleMaintenance" ADD CONSTRAINT "VehicleMaintenance_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "Vehicle"("vehicle_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleMaintenance" ADD CONSTRAINT "VehicleMaintenance_maintenanceRequestRequest_id_fkey" FOREIGN KEY ("maintenanceRequestRequest_id") REFERENCES "MaintenanceRequest"("request_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RouteDetail" ADD CONSTRAINT "RouteDetail_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "Route"("route_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RouteDetail" ADD CONSTRAINT "RouteDetail_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "Station"("station_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RouteSchedule" ADD CONSTRAINT "RouteSchedule_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "Route"("route_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StationSurveillance" ADD CONSTRAINT "StationSurveillance_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "Station"("station_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleOperation" ADD CONSTRAINT "VehicleOperation_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "Vehicle"("vehicle_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleOperation" ADD CONSTRAINT "VehicleOperation_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "Route"("route_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleOperation" ADD CONSTRAINT "VehicleOperation_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "DriverInfo"("driver_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserRole" ADD CONSTRAINT "_UserRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Role"("role_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserRole" ADD CONSTRAINT "_UserRole_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
