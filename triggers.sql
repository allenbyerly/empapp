-- Trigger: employee_history

-- DROP TRIGGER employee_history ON public."Employees";
-- FUNCTION: public.employee_history()

-- DROP FUNCTION public.employee_history();
CREATE FUNCTION public.employee_history()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF 
AS $BODY$
    BEGIN
        --
        -- Create a row in employeeHistories to reflect the operation performed on emp,
        -- make use of the special variable TG_OP to work out the operation.
        --
		IF (TG_OP = 'INSERT') THEN
			INSERT INTO "EmployeeHistories" (title, name, supervisor, status, "employeeId", "createdAt", "updatedAt") 
			VALUES (NEW.title, NEW.name, NEW.supervisor, NEW.status, NEW.id, now(), now());
		ELSIF ((NEW.title <> OLD.title) OR (NEW.supervisor <> OLD.supervisor)) THEN
			INSERT INTO "EmployeeHistories" (title, name, supervisor, status, "employeeId", "createdAt", "updatedAt") 
			VALUES (NEW.title, NEW.name, NEW.supervisor, NEW.status, NEW.id, now(), now());
		END IF;
        RETURN NULL; -- result is ignored since this is an AFTER trigger
    END;
$BODY$;

ALTER FUNCTION public.employee_history()
    OWNER TO postgres;


					
CREATE TRIGGER employee_history
    AFTER INSERT OR UPDATE 
    ON public."Employees"
    FOR EACH ROW
    EXECUTE PROCEDURE public.employee_history();
ALTER TABLE public."Employees"
    ENABLE TRIGGER employee_history;
