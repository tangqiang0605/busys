/*
  Warnings:

  - You are about to drop the `_UserRole` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updated_at` to the `DriverInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `DriverSchedule` table without a default value. This is not possible if the table is not empty.
  - Made the column `extra_schedule_id` on table `DriverSchedule` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updated_at` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Route` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `RouteDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `RouteSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Station` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `StationSurveillance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `role_id` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `updated_at` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `VehicleOperation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_UserRole" DROP CONSTRAINT "_UserRole_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserRole" DROP CONSTRAINT "_UserRole_B_fkey";

-- AlterTable
ALTER TABLE "DriverInfo" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "DriverSchedule" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "extra_schedule_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Route" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "RouteDetail" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "RouteSchedule" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Station" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "StationSurveillance" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
DROP COLUMN "role_id",
ADD COLUMN     "role_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "VehicleOperation" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "_UserRole";

-- CreateTable
CREATE TABLE "FixedSchedule" (
    "schedule_id" SERIAL NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "weekly_schedule" JSON NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FixedSchedule_pkey" PRIMARY KEY ("schedule_id")
);

-- CreateTable
CREATE TABLE "ExtraSchedule" (
    "schedule_id" SERIAL NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "special_schedule" JSON NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExtraSchedule_pkey" PRIMARY KEY ("schedule_id")
);

-- CreateTable
CREATE TABLE "EmployeePositions" (
    "position_id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "job_id" INTEGER NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmployeePositions_pkey" PRIMARY KEY ("position_id")
);

-- CreateTable
CREATE TABLE "JobList" (
    "job_id" SERIAL NOT NULL,
    "job_title" VARCHAR(100) NOT NULL,
    "job_description" TEXT,
    "salary" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobList_pkey" PRIMARY KEY ("job_id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "published_at" TIMESTAMP(3),
    "usr_id" INTEGER NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsCategories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NewsCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsReviews" (
    "id" SERIAL NOT NULL,
    "news_id" INTEGER NOT NULL,
    "reviewer_id" INTEGER NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "comment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NewsReviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fare" (
    "fare_id" SERIAL NOT NULL,
    "route_id" INTEGER NOT NULL,
    "fare_type" VARCHAR(50) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "description" TEXT,

    CONSTRAINT "Fare_pkey" PRIMARY KEY ("fare_id")
);

-- CreateTable
CREATE TABLE "Bills" (
    "bill_id" SERIAL NOT NULL,
    "bill_type" VARCHAR(50) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,

    CONSTRAINT "Bills_pkey" PRIMARY KEY ("bill_id")
);

-- CreateTable
CREATE TABLE "FareBills" (
    "fare_bill_id" SERIAL NOT NULL,
    "bill_id" INTEGER NOT NULL,
    "vehicle_id" INTEGER NOT NULL,
    "fare_type" VARCHAR(50) NOT NULL,
    "route_id" INTEGER NOT NULL,

    CONSTRAINT "FareBills_pkey" PRIMARY KEY ("fare_bill_id")
);

-- CreateTable
CREATE TABLE "SafetySurveillance" (
    "record_id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP NOT NULL,
    "report_content" TEXT NOT NULL,
    "facility_id" INTEGER NOT NULL,

    CONSTRAINT "SafetySurveillance_pkey" PRIMARY KEY ("record_id")
);

-- CreateTable
CREATE TABLE "StationMaintenance" (
    "maintenance_id" SERIAL NOT NULL,
    "station_id" INTEGER NOT NULL,
    "maintenance_date" DATE NOT NULL,
    "request_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "bill_id" INTEGER,
    "staff_id" INTEGER NOT NULL,

    CONSTRAINT "StationMaintenance_pkey" PRIMARY KEY ("maintenance_id")
);

-- CreateTable
CREATE TABLE "FacilityMaintenance" (
    "maintenance_id" SERIAL NOT NULL,
    "facility_id" INTEGER NOT NULL,
    "request_id" INTEGER NOT NULL,
    "staff_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,

    CONSTRAINT "FacilityMaintenance_pkey" PRIMARY KEY ("maintenance_id")
);

-- CreateTable
CREATE TABLE "Facilitie" (
    "facility_id" SERIAL NOT NULL,
    "facility_type_id" INTEGER NOT NULL,
    "description" TEXT,
    "location" VARCHAR(255) NOT NULL,
    "owner_id" VARCHAR(50),

    CONSTRAINT "Facilitie_pkey" PRIMARY KEY ("facility_id")
);

-- CreateTable
CREATE TABLE "FacilityTypes" (
    "type_id" SERIAL NOT NULL,
    "type_name" VARCHAR(100) NOT NULL,
    "type_description" TEXT,
    "image_url" TEXT,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "FacilityTypes_pkey" PRIMARY KEY ("type_id")
);

-- CreateTable
CREATE TABLE "FacilityRequests" (
    "request_id" SERIAL NOT NULL,
    "request_date" DATE NOT NULL,
    "facility_type_id" INTEGER NOT NULL,
    "request_reason" TEXT NOT NULL,
    "owner_type" VARCHAR(50) NOT NULL,
    "owner_id" VARCHAR(50) NOT NULL,
    "approval_status" VARCHAR(20) NOT NULL,

    CONSTRAINT "FacilityRequests_pkey" PRIMARY KEY ("request_id")
);

-- CreateTable
CREATE TABLE "FacilityAssignments" (
    "assignment_id" SERIAL NOT NULL,
    "request_id" INTEGER NOT NULL,
    "facility_id" INTEGER NOT NULL,
    "assignment_date" DATE NOT NULL,

    CONSTRAINT "FacilityAssignments_pkey" PRIMARY KEY ("assignment_id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriverSchedule" ADD CONSTRAINT "DriverSchedule_fixed_schedule_id_fkey" FOREIGN KEY ("fixed_schedule_id") REFERENCES "FixedSchedule"("schedule_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriverSchedule" ADD CONSTRAINT "DriverSchedule_extra_schedule_id_fkey" FOREIGN KEY ("extra_schedule_id") REFERENCES "ExtraSchedule"("schedule_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeePositions" ADD CONSTRAINT "EmployeePositions_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeePositions" ADD CONSTRAINT "EmployeePositions_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "JobList"("job_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "NewsCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsReviews" ADD CONSTRAINT "NewsReviews_news_id_fkey" FOREIGN KEY ("news_id") REFERENCES "News"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fare" ADD CONSTRAINT "Fare_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "Route"("route_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FareBills" ADD CONSTRAINT "FareBills_bill_id_fkey" FOREIGN KEY ("bill_id") REFERENCES "Bills"("bill_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FareBills" ADD CONSTRAINT "FareBills_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "Vehicle"("vehicle_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FareBills" ADD CONSTRAINT "FareBills_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "Route"("route_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SafetySurveillance" ADD CONSTRAINT "SafetySurveillance_facility_id_fkey" FOREIGN KEY ("facility_id") REFERENCES "Facilitie"("facility_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StationMaintenance" ADD CONSTRAINT "StationMaintenance_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "Station"("station_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StationMaintenance" ADD CONSTRAINT "StationMaintenance_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "MaintenanceRequest"("request_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StationMaintenance" ADD CONSTRAINT "StationMaintenance_bill_id_fkey" FOREIGN KEY ("bill_id") REFERENCES "Bills"("bill_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StationMaintenance" ADD CONSTRAINT "StationMaintenance_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "Employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacilityMaintenance" ADD CONSTRAINT "FacilityMaintenance_facility_id_fkey" FOREIGN KEY ("facility_id") REFERENCES "Facilitie"("facility_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacilityMaintenance" ADD CONSTRAINT "FacilityMaintenance_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "MaintenanceRequest"("request_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacilityMaintenance" ADD CONSTRAINT "FacilityMaintenance_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "Employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Facilitie" ADD CONSTRAINT "Facilitie_facility_type_id_fkey" FOREIGN KEY ("facility_type_id") REFERENCES "FacilityTypes"("type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacilityRequests" ADD CONSTRAINT "FacilityRequests_facility_type_id_fkey" FOREIGN KEY ("facility_type_id") REFERENCES "FacilityTypes"("type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacilityAssignments" ADD CONSTRAINT "FacilityAssignments_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "FacilityRequests"("request_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacilityAssignments" ADD CONSTRAINT "FacilityAssignments_facility_id_fkey" FOREIGN KEY ("facility_id") REFERENCES "Facilitie"("facility_id") ON DELETE RESTRICT ON UPDATE CASCADE;
