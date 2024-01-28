/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.employee.app.entity;

import java.util.Properties;
import java.util.stream.Stream;
import javax.imageio.spi.ServiceRegistry;
import org.hibernate.HibernateException;
import org.hibernate.MappingException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;
import org.hibernate.internal.util.config.ConfigurationHelper;

/**
 *
 * @author shekhar
 */
public class EmployeeIdGenerator implements IdentifierGenerator {

    private static final Long INITIAL_VALUE = 1000000L;
    private static final String VALUE_PREFIX_DEFAULT = "P";
    
    @Override
    public Object generate(SharedSessionContractImplementor session, Object object) throws HibernateException {        

        String query = String.format("select %s from %s", session.getEntityPersister(object.getClass().getName(), object)
                        .getIdentifierPropertyName(),
                object.getClass().getSimpleName());
        
        Stream<String> ids = session.createQuery(query, String.class).stream();
       
        Long max = ids
                .map(o -> o.replace(VALUE_PREFIX_DEFAULT, ""))
                .mapToLong(value -> Long.parseLong(value))
                .max()
                .orElse(INITIAL_VALUE);
                 
        return VALUE_PREFIX_DEFAULT + (max + 1);
    }
}