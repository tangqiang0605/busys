-- CreateTable
CREATE TABLE "LeaveRequests" (
    "leave_id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "reason" TEXT NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeaveRequests_pkey" PRIMARY KEY ("leave_id")
);
